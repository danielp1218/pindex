import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
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
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'background: transparent; overflow: visible;');

    // Create a group for zoom/pan
    const g = svg.append('g');

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
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
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-150))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(28))
      .force('bounds', () => {
        // Keep nodes within visible bounds
        nodes.forEach((d: any) => {
          d.x = Math.max(nodeRadius, Math.min(width - nodeRadius, d.x));
          d.y = Math.max(nodeRadius, Math.min(height - nodeRadius, d.y));
        });
      });

    // Draw links with relationship colors
    const edgeTooltip = d3.select(edgeTooltipRef.current);
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
        d3.select(event.target as Element)
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
        d3.select(event.target as Element)
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
      .call(d3.drag<any, any>()
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

    // Add market images or fallback circles to nodes
    node.each(function(d: any) {
      const nodeGroup = d3.select(this);
      
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
        // Minimal circle for nodes without images
        nodeGroup.append('circle')
          .attr('r', 18)
          .attr('fill', '#1e293b')
          .attr('stroke', '#334155')
          .attr('stroke-width', 1);
        
        // Small label inside
        nodeGroup.append('text')
          .text(d.label.substring(0, 2).toUpperCase())
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', '#64748b')
          .attr('font-size', '9px')
          .attr('font-weight', '500')
          .attr('pointer-events', 'none');
      }
    });

    // Add hover tooltip events
    const tooltip = d3.select(tooltipRef.current);
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
