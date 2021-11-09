import { useParams } from "react-router-dom";

export default function Author() {
  let params = useParams();
  return <h2>Invoice {params.authorName}</h2>;
}
