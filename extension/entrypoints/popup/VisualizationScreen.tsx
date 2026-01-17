import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphData, Node, Link } from '@/types/graph';

interface VisualizationScreenProps {
  graphData: GraphData;
}

function VisualizationScreen({ graphData }: VisualizationScreenProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || graphData.nodes.length === 0) return;

    const width = 380;
    const height = 480;

    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'border: 1px solid #334155; background: #1e1e1e; border-radius: 12px;');

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

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // Draw links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Draw nodes
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
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
        // Use the market image from the page
        nodeGroup.append('image')
          .attr('href', d.imageUrl)
          .attr('width', 40)
          .attr('height', 40)
          .attr('x', -20)
          .attr('y', -20)
          .attr('clip-path', 'url(#circleClip)')
          .attr('preserveAspectRatio', 'xMidYMid slice');
      } else {
        // Fallback to teal circle for nodes without images
        nodeGroup.append('circle')
          .attr('r', 20)
          .attr('fill', '#69b3a2')
          .attr('stroke', '#fff')
          .attr('stroke-width', 2);
      }
    });

    // Add labels only to nodes without images (fallback nodes)
    node.each(function(d: any) {
      if (!d.imageUrl) {
        d3.select(this).append('text')
          .text(d.label)
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', '#fff')
          .attr('font-size', '10px')
          .attr('pointer-events', 'none');
      }
    });

    // Add hover tooltip events
    const tooltip = d3.select(tooltipRef.current);
    node
      .on('mouseenter', (event: MouseEvent, d: any) => {
        tooltip
          .style('opacity', '1')
          .style('left', `${event.offsetX + 10}px`)
          .style('top', `${event.offsetY - 10}px`)
          .text(d.label);
      })
      .on('mousemove', (event: MouseEvent) => {
        tooltip
          .style('left', `${event.offsetX + 10}px`)
          .style('top', `${event.offsetY - 10}px`);
      })
      .on('mouseleave', () => {
        tooltip.style('opacity', '0');
      });

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [graphData]);

  if (graphData.nodes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>No nodes to display. Switch to "Add Nodes" to create some.</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.15s',
          maxWidth: '200px',
          wordWrap: 'break-word',
          border: '1px solid #334155',
          zIndex: 10,
        }}
      />
      <div style={{ marginTop: '8px', fontSize: '11px', color: '#666' }}>
        <p style={{ margin: 0 }}>Drag nodes to move. Scroll to zoom.</p>
      </div>
    </div>
  );
}

export default VisualizationScreen;
