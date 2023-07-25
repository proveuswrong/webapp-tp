import { Tabs as TabsAntDesign } from "antd";
import * as styles from "./index.module.scss";

export default function Tabs({ items }) {
  return (
    <TabsAntDesign className={styles.tabs}>
      {items?.map((item, i) => (
        <TabsAntDesign.TabPane tab={item.label} key={i}>
          {item.content}
        </TabsAntDesign.TabPane>
      ))}
    </TabsAntDesign>
  );
}
