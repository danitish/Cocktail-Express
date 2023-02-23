import { Helmet } from "react-helmet";

const Meta = ({
  title = "CE Business Manager - Home",
  desc = "Efficient and Simple",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Helmet>
  );
};

export default Meta;
