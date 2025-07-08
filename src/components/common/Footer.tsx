import ContactLinks from "./ContactLinks";

const Footer = () => {
  return (
    <footer className="mt-auto flex flex-col items-center justify-center gap-3 py-10">
      <ContactLinks />
      <p className="text-t-subtle">Copyrights 2025. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
