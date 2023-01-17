const Footer = () => {
  return (
    <div className="footer bg-primary d-flex justify-content-center text-white py-1">
      <span className="mb-0">
        Created by Daniel Tishenko &copy; {new Date().getFullYear()}
      </span>
    </div>
  );
};

export default Footer;
