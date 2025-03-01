

export default function StatsBar({ stat }) {
    const { name, value } = stat;
    
   
    const percentage = Math.min((value / 255) * 100, 100);
    
    
    const formatStatName = (name) => {
      switch (name) {
        case 'hp':
          return 'HP';
        case 'attack':
          return 'Attack';
        case 'defense':
          return 'Defense';
        case 'special-attack':
          return 'Sp. Atk';
        case 'special-defense':
          return 'Sp. Def';
        case 'speed':
          return 'Speed';
        default:
          return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }
    };
    
    
    const getStatColor = (statName) => {
      switch (statName) {
        case 'hp':
          return 'bg-green-500';
        case 'attack':
          return 'bg-red-500';
        case 'defense':
          return 'bg-blue-500';
        case 'special-attack':
          return 'bg-purple-500';
        case 'special-defense':
          return 'bg-indigo-500';
        case 'speed':
          return 'bg-yellow-500';
        default:
          return 'bg-gray-500';
      }
    };
    
    return (
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{formatStatName(name)}</span>
          <span className="text-sm font-medium">{value}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${getStatColor(name)}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  }