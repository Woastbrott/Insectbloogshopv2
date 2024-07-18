// pages/about/index.js
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Über uns</h1>
        <div className="text-lg text-black mb-8 space-y-4">
          <p>
            <strong>Hipp Hoppers</strong> ist dein Ansprechpartner für die faszinierende Welt der exotischen Insekten. Gegründet in Baden-Württemberg, haben wir es uns zur Aufgabe gemacht, tropische Insekten wie Gottesanbeterinnen und seltene Phasmiden zu züchten und zu verkaufen. Unsere Leidenschaft für diese einzigartigen Kreaturen möchten wir mit dir teilen und gleichzeitig mehr Menschen für die Haltung und Pflege von Insekten begeistern.
          </p>
          <h2 className="text-2xl font-bold mt-6">Unsere Mission</h2>
          <p>
            Unser Ziel ist es, qualitativ hochwertige und gesunde Insekten anzubieten und dabei das Wissen über ihre Pflege und Haltung zu verbreiten. Egal, ob du ein erfahrener Insektenhalter oder ein neugieriger Anfänger bist, bei uns findest du die Unterstützung und Informationen, die du brauchst.
          </p>
          <h2 className="text-2xl font-bold mt-6">Was uns auszeichnet</h2>
          <p>
            <strong>Seltene und exotische Arten:</strong> Wir bieten eine Vielzahl von Insektenarten, die du in herkömmlichen Zoohandlungen nur selten findest.
          </p>
          <p>
            <strong>Kundenzufriedenheit:</strong> Wir legen großen Wert auf exzellenten Kundenservice und sind stets bemüht, deine Fragen schnell und kompetent zu beantworten.
          </p>
          <p>
            <strong>Bildungsressourcen:</strong> Auf unserer Website findest du umfangreiche Pflegeanleitungen, Blogbeiträge und Videos, die dir helfen, deine Insekten artgerecht zu halten.
          </p>
          <h2 className="text-2xl font-bold mt-6">Unsere Vision</h2>
          <p>
            Wir möchten Hipp Hoppers als vertrauenswürdigen und innovativen Anbieter für tropische Insekten etablieren. Durch unser Engagement und unsere Leidenschaft streben wir danach, eine starke Gemeinschaft von Insektenliebhabern zu schaffen und das Bewusstsein für die Schönheit und Bedeutung dieser faszinierenden Kreaturen zu fördern.
          </p>
          <p>
            Danke, dass du Hipp Hoppers besuchst. Wir freuen uns darauf, dich auf deiner Reise in die Welt der tropischen Insekten zu begleiten. Bei Fragen oder Anregungen kannst du uns jederzeit kontaktieren.
          </p>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
