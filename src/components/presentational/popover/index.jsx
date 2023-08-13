import { Popover as PopoverAntDesign } from "antd";

export default function Popover(props) {
  const { children, ...overrides } = props;
  return <PopoverAntDesign {...overrides}>{children}</PopoverAntDesign>;
}
