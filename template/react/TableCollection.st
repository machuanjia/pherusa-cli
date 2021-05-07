import React, { Component } from 'react';
import { Form, Input, Button } from 'laiye-antd';
import i18n from 'i18next';
import { I<% cmNameUppercase %> } from '@interfaces/index';

type Props = {
  callback: ({ isVisible, isRefresh }) => unknown;
  entity: I<% cmNameUppercase %>;
};
type State = {
  loading: boolean;
};

const { TextArea } = Input

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
  handleSubmit(values) {
    this.props.callback({
      isVisible: false,
      isRefresh: true,
      values
    } as any);
  }
 
  render() {
    const { entity } = this.props
    return (
       <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={this.handleSubmit.bind(this)}
        initialValues={{
          name: entity ? entity.name : '',
          description: entity ? entity.description : '',
        }}
      >
        <Form.Item
          label={i18n.t('list.name')}
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder={i18n.t('list.namePlaceholder')} />
        </Form.Item>
        <Form.Item
          label={i18n.t('list.description')}
          name="description"
        >
          <TextArea rows={4} placeholder={i18n.t('list.descriptionPlaceholder')} />
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
