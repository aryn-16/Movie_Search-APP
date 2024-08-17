import { miyagi } from "ldrs";

export default function Loader({ color }) {
  miyagi.register();
  return <l-miyagi size="35" stroke="3.5" speed="0.9" color={color}></l-miyagi>;
}
