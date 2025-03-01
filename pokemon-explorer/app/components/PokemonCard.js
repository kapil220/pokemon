
import Link from 'next/link';
import Image from 'next/image';

export default function PokemonCard({ pokemon }) {
  const { id, name, image } = pokemon;
  
  
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  
  return (
    <Link href={`/pokemon/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer">
        <div className="bg-gray-100 p-4 flex justify-center">
          <Image 
            src={image}
            alt={`${formattedName} image`}
            width={120}
            height={120}
            priority={id <= 20}
          />
        </div>
        <div className="p-4">
          <span className="text-gray-500 text-sm">#{id.padStart(3, '0')}</span>
          <h2 className="text-lg font-semibold text-gray-800">{formattedName}</h2>
        </div>
      </div>
    </Link>
  );
}