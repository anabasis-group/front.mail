import React from "react";
import useSWR from "swr";
import { EditableProTable } from "@ant-design/pro-components";
import { Card, Col, Row, Button, Input } from "antd";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App() {
  const { data, error, isLoading } = useSWR(
    "https://gist.githubusercontent.com/anabasis-group/dacda2756bed5cd246696bb79da6c18b/raw/837d17aabf200e5c478ba4ba0317564187f154f8/mail-vapezone-pro.json",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  let emails = data.data.map((i, k) => {
    let fullname = [i.lastname, i.firstname, i.middlename].join(" ");
    let user = i.email.split("@")[0];

    let groups = Object.values(i.groups).map((g) => (
      <Col span={4}>{g.name}</Col>
    ));

    return (
      <Card title={i.username} extra={fullname}>
        <Row gutter={16}>
          <Col>
            <Input defaultValue={i.email} value={i.email} />
          </Col>
          <Col>
            <Input defaultValue={i.username} value={i.username} />
          </Col>
        </Row>
        <Row layout={"horizontal"}>{groups}</Row>

        <EditableProTable />
      </Card>
    );
  });

  // let buttons = [
  //   { value: data.subscribers_count, icon: "✨" },
  //   { value: data.stargazers_count, icon: "👁" },
  //   { value: data.forks_count, icon: "🍴" }
  // ];

  // let extraButtons = buttons.map((i) => (
  //   <Col>
  //     <Button icon={i.icon}>{i.value}</Button>
  //   </Col>
  // ));
  return <div>{emails}</div>;
}
