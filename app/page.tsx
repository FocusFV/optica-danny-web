import Navbar from '../components/Navbar';
import About from '../components/About';
import Shows from '../components/Shows';
import Footer from '../components/Footer'; // <--- Importalo

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1 className="text-5xl font-bold text-center text-blue-600 mt-20">
        Bienvenidos a Improflow
      </h1>
      <About />
      <Shows />
      <Footer /> {/* <--- Llamalo acá */}
    </main>
  );
}