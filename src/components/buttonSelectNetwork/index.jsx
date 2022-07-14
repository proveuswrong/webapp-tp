import React from "react";
import { EthereumContext, chains } from "../../data/ethereumProvider";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Space, Tooltip } from "antd";
import CustomButton from "/src/components/ui/button";
import CustomDropdown from "/src/components/ui/dropdown";
import MenuItem from "/src/components/ui/menuItem";

import { utils } from "ethers";

const handleMenuClick = (e) => {
  console.log(e);
  ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: e.key }],
  });
};

// TODO Custom menu item
const menu = (
  <Menu onClick={handleMenuClick}>
    {Object.entries(chains).map(([key, value], index) => {
      return <MenuItem key={key}>{value?.name}</MenuItem>;
    })}
  </Menu>
);

export default function ButtonSelectNetwork() {
  return (
    <EthereumContext.Consumer>
      {(ethereum) => (
        <CustomDropdown modifiers="small secondary" overlay={menu}>
          <Button id="buttonSelectNetwork">
            <span key={ethereum?.chainId} className="blink">
              {chains[ethereum?.chainId]?.shortname || "Unsupported Network"}
            </span>
            <DownOutlined />
          </Button>
        </CustomDropdown>
      )}
    </EthereumContext.Consumer>
  );
}
