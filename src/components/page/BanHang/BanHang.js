import React, { useMemo, useState, useRef } from "react";
import { Button, Divider, Tabs, Input, Row, Col, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTruck,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";

const OperationsSlot = {
  left: (
    <div
      className="tabs-extra-demo-button"
      style={{ margin: "0px 10px 10px 0px" }}
    >
      <Input
        size="middle"
        placeholder="Tìm kiếm hàng hóa"
        prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        style={{ width: "300px" }}
      />
    </div>
  ),
};

const initialItems = [
  {
    label: "Tab 1",
    children: (
      <section>
        <Tabs
          tabPosition={"bottom"}
          style={{ height: "500px" }}
          items={[
            {
              label: "Bán tại quầy",
              children: (
                <section>
                  <Row>
                    <Col span={12}></Col>
                    <Col span={12}>
                      <Card>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                      </Card>
                    </Col>
                  </Row>
                </section>
              ),
              key: "sub-1",
              icon: <FontAwesomeIcon icon={faCircleDollarToSlot} />,
            },
            {
              label: "Bán giao hàng",
              children: <section>bán giao hàng</section>,
              key: "sub-2",
              icon: <FontAwesomeIcon icon={faTruck} />,
            },
          ]}
        />
      </section>
    ),
    key: "1",
    closable: false,
  },
];

const App = () => {
  const [position, setPosition] = useState(["left"]);

  const slot = useMemo(() => {
    if (position.length === 0) return null;
    return position.reduce(
      (acc, direction) => ({
        ...acc,
        [direction]: OperationsSlot[direction],
      }),
      {}
    );
  }, [position]);

  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: "newTab",
      children: (
        <section>
          <Tabs
            tabPosition={"bottom"}
            style={{ height: "500px" }}
            items={[
              {
                label: "Bán tại quầy",
                children: <div></div>,
                key: "sub-1",
                icon: <FontAwesomeIcon icon={faCircleDollarToSlot} />,
              },
              {
                label: "Bán giao hàng",
                children: <div></div>,
                key: "sub-2",
                icon: <FontAwesomeIcon icon={faTruck} />,
              },
            ]}
          />
        </section>
      ),
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <>
      <Tabs
        type="editable-card"
        onChange={onChange}
        tabBarExtraContent={slot}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
    </>
  );
};
export default App;
