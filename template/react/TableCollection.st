import React, { Component } from 'react';
import { Form, Input, Button } from 'laiye-antd';
import i18n from 'i18next';

type Props = {
  callback: ({ isVisible, isRefresh }) => unknown;
  form: any;
  entity: unknown;
};
type State = {
  loading: boolean;
};

export default class <% name %> extends Component<
  Props,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    console.log(this.props.entity);
  }
  cancel(e) {
    e.preventDefault();
    this.props.callback({
      isVisible: false,
      isRefresh: false,
    });
  }
  handleSubmit() {
    this.props.callback({
      isVisible: false,
      isRefresh: true,
    });
  }
 
  render() {
    return (
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={this.handleSubmit.bind(this)}
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="m-r-12">
            {i18n.t('action.save')}
          </Button>
          <Button onClick={this.cancel.bind(this)}> {i18n.t('action.cancel')}</Button>
        </Form.Item>
      </Form>
    );
  }
}
