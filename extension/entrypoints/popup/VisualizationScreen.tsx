import { useEffect, useRef } from 'react';
import {
  select,
  d3Zoom,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  drag,
  type Simulation,
} from '@/utils/d3-imports';
import { motion } from 'framer-motion';
import { GraphData, getRelationshipColor, BetRelationship } from '@/types/graph';

interface VisualizationScreenProps {
  graphData: GraphData;
}

function VisualizationScreen({ graphData }: VisualizationScreenProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const edgeTooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || graphData.nodes.length === 0) return;

    const width = 380;
    const height = 460;

    // Clear previous render
    select(svgRef.current).selectAll('*').remove();

    const svg = select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'background: transparent; overflow: visible;');

    // Create a group for zoom/pan
    const g = svg.append('g');

    // Add zoom behavior
    const zoom = d3Zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create copies of data for D3 simulation
    const nodes = graphData.nodes.map(d => ({ ...d }));
    const links = graphData.links.map(d => ({ ...d }));

    // Create force simulation - gentler forces for cleaner layout
    const nodeRadius = 24;
    const simulation = forceSimulation(nodes)
      .force('link', forceLink(links).id((d: any) => d.id).distance(80))
      .force('charge', forceManyBody().strength(-150))
      .force('center', forceCenter(width / 2, height / 2))
      .force('collision', forceCollide().radius(28))
      .force('bounds', () => {
        // Keep nodes within visible bounds
        nodes.forEach((d: any) => {
          d.x = Math.max(nodeRadius, Math.min(width - nodeRadius, d.x));
          d.y = Math.max(nodeRadius, Math.min(height - nodeRadius, d.y));
        });
      });

    // Draw links with relationship colors
    const edgeTooltip = select(edgeTooltipRef.current);
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d: any) => getRelationshipColor(d.relationship))
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', (event: MouseEvent, d: any) => {
        // Highlight the edge
        select(event.target as Element)
          .attr('stroke-opacity', 1)
          .attr('stroke-width', 3);

        // Show tooltip with relationship info
        const relationshipLabel = d.relationship || 'Related';
        const reasoning = d.reasoning || '';
        edgeTooltip
          .style('opacity', '1')
          .style('left', `${event.offsetX + 15}px`)
          .style('top', `${event.offsetY - 5}px`)
          .html(`<strong>${relationshipLabel}</strong>${reasoning ? `<br/>${reasoning}` : ''}`);
      })
      .on('mousemove', (event: MouseEvent) => {
        edgeTooltip
          .style('left', `${event.offsetX + 15}px`)
          .style('top', `${event.offsetY - 5}px`);
      })
      .on('mouseleave', (event: MouseEvent) => {
        // Reset edge style
        select(event.target as Element)
          .attr('stroke-opacity', 0.6)
          .attr('stroke-width', 2);
        edgeTooltip.style('opacity', '0');
      });

    // Draw nodes
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'grab')
      .call(drag<any, any>()
        .on('start', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Add circular clip path definition
    const defs = svg.append('defs');
    defs.append('clipPath')
      .attr('id', 'circleClip')
      .append('circle')
      .attr('r', 20)
      .attr('cx', 0)
      .attr('cy', 0);

    // Create gradient placeholders for nodes without images
    const gradientColors = [
      ['#4a7c6f', '#2d5a4d'], // teal
      ['#5c7a9e', '#3d5a7a'], // blue
      ['#7a6b8a', '#5a4d6a'], // purple
      ['#8a7a5c', '#6a5a3d'], // amber
      ['#8b5c5c', '#6a3d3d'], // rose
      ['#6b8a7a', '#4d6a5a'], // sage
    ];

    // Generate a consistent color index from label
    const getColorIndex = (label: string) => {
      let hash = 0;
      for (let i = 0; i < label.length; i++) {
        hash = ((hash << 5) - hash) + label.charCodeAt(i);
        hash = hash & hash;
      }
      return Math.abs(hash) % gradientColors.length;
    };

    // Create gradients for each node
    nodes.forEach((node: any, i: number) => {
      const colorIdx = getColorIndex(node.label || node.id);
      const [color1, color2] = gradientColors[colorIdx];
      const gradient = defs.append('linearGradient')
        .attr('id', `popupVizNodeGradient-${i}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%');
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', color1);
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', color2);
    });

    // Add market images or gradient fallback circles to nodes
    node.each(function(d: any, i: number) {
      const nodeGroup = select(this);

      if (d.imageUrl) {
        // Just the clipped image, no border
        nodeGroup.append('image')
          .attr('href', d.imageUrl)
          .attr('width', 40)
          .attr('height', 40)
          .attr('x', -20)
          .attr('y', -20)
          .attr('clip-path', 'url(#circleClip)')
          .attr('preserveAspectRatio', 'xMidYMid slice');
      } else {
        // Gradient circle placeholder with text
        nodeGroup.append('circle')
          .attr('r', 18)
          .attr('fill', `url(#popupVizNodeGradient-${i})`)
          .attr('stroke', 'rgba(255, 255, 255, 0.2)')
          .attr('stroke-width', 1);

        // Small label inside
        nodeGroup.append('text')
          .text(d.label.substring(0, 2).toUpperCase())
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', '#ffffff')
          .attr('font-size', '9px')
          .attr('font-weight', '600')
          .attr('pointer-events', 'none');
      }
    });

    // Add hover tooltip events
    const tooltip = select(tooltipRef.current);
    node
      .on('mouseenter', (event: MouseEvent, d: any) => {
        tooltip
          .style('opacity', '1')
          .style('left', `${event.offsetX + 15}px`)
          .style('top', `${event.offsetY - 5}px`)
          .text(d.label);
      })
      .on('mousemove', (event: MouseEvent) => {
        tooltip
          .style('left', `${event.offsetX + 15}px`)
          .style('top', `${event.offsetY - 5}px`);
      })
      .on('mouseleave', () => {
        tooltip.style('opacity', '0');
      });

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source?.x ?? 0)
        .attr('y1', (d: any) => d.source?.y ?? 0)
        .attr('x2', (d: any) => d.target?.x ?? 0)
        .attr('y2', (d: any) => d.target?.y ?? 0);

      node.attr('transform', (d: any) => {
        const x = d.x ?? 0;
        const y = d.y ?? 0;
        return `translate(${x},${y})`;
      });
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [graphData]);

  if (graphData.nodes.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '80px 20px',
        color: '#475569',
        fontSize: '13px',
      }}>
        <p style={{ margin: 0 }}>No nodes yet</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', overflow: 'visible' }}>
      {/* Graph content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <svg ref={svgRef} style={{ overflow: 'visible' }}></svg>
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#94a3b8',
            padding: '6px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 500,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.1s',
            maxWidth: '180px',
            wordWrap: 'break-word',
            zIndex: 10,
          }}
        />
        <div
          ref={edgeTooltipRef}
          style={{
            position: 'absolute',
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#94a3b8',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 500,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.1s',
            maxWidth: '220px',
            wordWrap: 'break-word',
            zIndex: 11,
            lineHeight: 1.4,
          }}
        />
      </motion.div>
    </div>
  );
}

export default VisualizationScreen;
