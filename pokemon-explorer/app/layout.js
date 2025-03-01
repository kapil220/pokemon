
import './styles/globals.css';

export const metadata = {
  title: 'Pokemon Explorer',
  description: 'Explore Pokemon data using the PokeAPI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <header className="bg-red-600 p-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-white">Pokemon Explorer</h1>
          </div>
        </header>
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>Pokemon Explorer App - Powered by PokeAPI</p>
        </footer>
      </body>
    </html>
  );
}