'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { GitHubUser } from '@/types/github';
import { useGitHubContributions } from '@/hooks/useGitHubContributions';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface ContributionsSectionProps {
  user: GitHubUser;
}

export default function ContributionsSection({ user }: ContributionsSectionProps) {
  const { contributions, loading, error } = useGitHubContributions(user.login);

  const { plotData, monthLabels } = useMemo(() => {
    if (!contributions) return { plotData: null, monthLabels: { positions: [], labels: [] } };

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const z: number[][] = Array(7).fill(null).map(() => []);
    const hoverText: string[][] = Array(7).fill(null).map(() => []);
    const customdata: string[][] = Array(7).fill(null).map(() => []);
    
    // Track month positions for labels
    const monthPositions: number[] = [];
    const monthLabels: string[] = [];
    let lastMonth = -1;

    // Fill data for each week
    contributions.weeks.forEach((week, weekIndex) => {
      week.contributionDays.forEach((day, dayIndex) => {
        z[dayIndex].push(day.contributionCount);
        const date = new Date(day.date);
        
        // Track month changes (use the first day of each week)
        if (dayIndex === 0) {
          const currentMonth = date.getMonth();
          if (currentMonth !== lastMonth) {
            monthPositions.push(weekIndex);
            monthLabels.push(date.toLocaleDateString('en-US', { month: 'short' }));
            lastMonth = currentMonth;
          }
        }
        
        const formattedDate = date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
        hoverText[dayIndex].push(`${formattedDate}\n${day.contributionCount} contributions`);
        customdata[dayIndex].push(day.date);
      });
    });

    return {
      plotData: {
        z,
        text: hoverText,
        customdata,
        type: 'heatmap' as const,
        colorscale: [
          [0, '#ebedf0'],      // No contributions (gray)
          [0.2, '#9be9a8'],    // 1-3 contributions (light green)
          [0.4, '#40c463'],    // 4-6 contributions (medium green)
          [0.6, '#30a14e'],    // 7-9 contributions (dark green)
          [1, '#216e39']       // 10+ contributions (darkest green)
        ],
        hovertemplate: '<b>%{text}</b><extra></extra>',
        showscale: false,
        xgap: 2,
        ygap: 2,
      } as any,
      monthLabels: {
        positions: monthPositions,
        labels: monthLabels
      }
    };
  }, [contributions]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !contributions || !plotData) {
    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600 text-center">
          Unable to load contribution data. {error && `(${error})`}
        </p>
      </div>
    );
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl font-semibold">
          {contributions.totalContributions.toLocaleString()} contributions in the last year
        </h2>
        <button className="text-sm text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-1 w-fit">
          Contribution settings
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        <div className="overflow-x-auto">

        <div style={{ minWidth: '800px' }}>
          <Plot
            data={[plotData]}
            layout={{
              yaxis: {
                tickvals: [0, 1, 2, 3, 4, 5, 6],
                ticktext: dayNames,
                autorange: 'reversed',
                showgrid: false,
                zeroline: false,
                fixedrange: true,
                side: 'left',
              },
              xaxis: {
                tickvals: monthLabels.positions,
                ticktext: monthLabels.labels,
                tickfont: { size: 12, color: '#666' },
                showgrid: false,
                zeroline: false,
                side: 'top',
                fixedrange: true,
              },
              plot_bgcolor: 'white',
              paper_bgcolor: 'white',
              margin: { l: 40, r: 20, t: 30, b: 10 },
              height: 180,
              hovermode: 'closest',
              autosize: true,
            }}
            config={{
              displayModeBar: false,
              responsive: true,
            }}
            style={{ width: '100%', height: '180px' }}
            useResizeHandler={true}
          />
        </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
          <span>Learn how we count contributions</span>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#ebedf0' }}></div>
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#9be9a8' }}></div>
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#40c463' }}></div>
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#30a14e' }}></div>
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#216e39' }}></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

