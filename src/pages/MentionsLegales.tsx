
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cinema-black">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="cinema-container">
          <div className="max-w-4xl mx-auto space-y-8 text-gray-300">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Mentions <span className="text-cinema-red">Légales</span>
            </h1>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">1. Éditeur du Site</h2>
              <p>Le présent site est édité par :</p>
              <p>Julien Kalaiselvan<br />
                Adresse : 76 boulevard Virgile Barle, Nice, France, 06300<br />
                Email : julienkalaiselvan@gmail.com<br />
                Téléphone : +33 0638662109</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">2. Hébergeur du Site</h2>
              <p>L'hébergement du site est assuré par :</p>
              <p>HOSTINGER operations, UAB<br />
                Adresse : Švitrigailos str. 34, Vilnius 03230, Lituanie<br />
                Téléphone : +37064503378<br />
                Email : domains@hostinger.com</p>
              <p>Corporate Officers :</p>
              <ul className="list-disc list-inside ml-4">
                <li>Antanas Patašius, Chief Technical Officer</li>
                <li>Daugirdas Jankus, Chief Executive Officer</li>
                <li>Domantas Beržanskis, Chief Financial Officer</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">3. Propriété Intellectuelle</h2>
              <p>L'ensemble des contenus présents sur ce site (textes, images, vidéos, graphismes, logo, icônes, sons) sont la propriété exclusive de Julien Kalaiselvan, sauf mentions contraires. Toute reproduction, distribution, modification, adaptation ou exploitation, partielle ou totale, de ces contenus, sans autorisation préalable, est strictement interdite.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">4. Données Personnelles</h2>
              <p>Les informations collectées sur ce site sont destinées à des fins de gestion des demandes et de communication. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, veuillez contacter : julienkalaiselvan@gmail.com.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">5. Responsabilité</h2>
              <p>L'éditeur du site ne saurait être tenu responsable de tout dommage direct ou indirect résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">6. Liens Hypertextes</h2>
              <p>Ce site peut contenir des liens vers d'autres sites web. L'éditeur du site n'est pas responsable du contenu de ces sites externes et ne peut être tenu responsable de leur accessibilité ou de tout dommage pouvant résulter de leur utilisation.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">7. Cookies</h2>
              <p>Ce site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">8. Droit Applicable et Juridiction Compétente</h2>
              <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux compétents seront ceux de Nice.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
