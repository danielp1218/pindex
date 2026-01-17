import './BetGroupsTable.css';

const betGroups = [
  {
    name: 'Politics Index',
    icon: '🏛️',
    performance: '+24.5%',
    positive: true,
    status: 'Active',
  },
  {
    name: 'Crypto Index',
    icon: '₿',
    performance: '+18.2%',
    positive: true,
    status: 'Active',
  },
  {
    name: 'Sports Index',
    icon: '⚽',
    performance: '-3.8%',
    positive: false,
    status: 'Paused',
  },
  {
    name: 'Science Index',
    icon: '🔬',
    performance: '+12.1%',
    positive: true,
    status: 'Active',
  },
];

export function BetGroupsTable() {
  return (
    <div className="bet-groups-table">
      <table className="table">
        <thead>
          <tr>
            <th className="th-left">Bet Groups</th>
            <th className="th-center">Index Performance</th>
            <th className="th-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {betGroups.map((group, index) => (
            <tr key={index} className="table-row">
              <td className="td-group">
                <span className="group-icon">{group.icon}</span>
                <span className="group-name">{group.name}</span>
              </td>
              <td className="td-center">
                <span className={`performance ${group.positive ? 'positive' : 'negative'}`}>
                  {group.performance}
                </span>
              </td>
              <td className="td-right">
                <span className={`status-badge ${group.status.toLowerCase()}`}>
                  {group.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
