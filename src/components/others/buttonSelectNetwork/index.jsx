import React from "react";
import {EthereumContext, networkMap} from "../../../data/ethereumProvider";
import {DownOutlined} from "@ant-design/icons";
import {Button, Menu} from "antd";
import CustomDropdown from "/src/components/presentational/dropdown";
import MenuItem from "/src/components/presentational/menuItem";
import {useNavigate} from "react-router-dom";


const handleMenuClick = (e, ethereumContext, navigate) => {
  console.log(ethereumContext);
  if (ethereumContext.isProviderDetected)
    ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{chainId: e.key}],
    });
  else {
    navigate('/0x4/')
  }
};

const menu = (ethereumContext, navigate) => (
  <Menu onClick={(e) => handleMenuClick(e, ethereumContext, navigate)}>
    {Object.entries(networkMap).map(([key, value], _index) => {
      return <MenuItem key={key}>{value?.name}</MenuItem>;
    })}
  </Menu>
);

export default function ButtonSelectNetwork() {
  const navigate = useNavigate();

  return (
    <EthereumContext.Consumer>
      {(ethereumContext) => (
        <CustomDropdown modifiers="small secondary" overlay={menu(ethereumContext, navigate)}>
          <Button id="buttonSelectNetwork">
            <span style={{color: 'inherit'}} key={ethereumContext?.chainId} className="blink">
              {networkMap[ethereumContext?.chainId]?.shortname || "Unsupported Network"}
            </span>
            <DownOutlined/>
          </Button>
        </CustomDropdown>
      )}
    </EthereumContext.Consumer>
  );
}
