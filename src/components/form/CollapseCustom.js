import React from "react";
import { Collapse, Divider, Button, Row, Col } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const StyledCollapseWrapper = styled.div`
  .ant-collapse {
    background-color: ffffff;
  }

  .btn-search {
    margin-top: 10px;
    text-align: right; /* Canh lề phải */
  }
`;

const CollapseCustom = (props) => (
  <StyledCollapseWrapper>
    <>
      <Divider orientation="left">{props.title}</Divider>
      <Collapse
        size="large"
        items={[
          {
            key: "1",
            label: "Tìm Kiếm",
            children: (
              <div>
                <Row>
                  {props.components.map((component, index) => (
                    <Col key={index} span={12}>
                      {component}
                    </Col>
                  ))}
                </Row>
                <div className="btn-search">
                  <Button type="primary">
                    <FontAwesomeIcon icon={faSearch} />
                    Tìm Kiếm
                  </Button>
                </div>
              </div>
            ),
          },
        ]}
      />
    </>
  </StyledCollapseWrapper>
);

export default CollapseCustom;
