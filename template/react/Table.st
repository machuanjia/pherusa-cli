import React, { Component, Fragment } from 'react';
import { Table, Input, Button, Tooltip, Modal } from 'laiye-antd';

import { ContentLayoutComponent } from 'laiye-pro';
import { MODAL_SIZE } from 'laiye-pro';
import <% collection %> from '<% collectionPath %><% collection %>';
import { listMixin } from 'laiye-pro';
import { get<% name %>s, create<% name %>, get<% name %>Detail, update<% name %>, delete<% name %> } from '@apis/index';
import type { IListMixin } from '@interfaces/mixin';
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import i18n from 'i18next';

type State = unknown;

class <% name %> extends Component<IListMixin, State> {
  init() {
    return {
      fetchAction: get<% name %>s,
      createAction: create<% name %>,
      getDetailAction: get<% name %>Detail,
      updateAction: update<% name %>,
      deleteAction: delete<% name %>,
    };
  }

  editAction(record) {
    this.props.editEntity(record._id);
  }

  deleteAction(record) {
    Modal.confirm({
      title: '删除',
      content: '确定要删除该记录吗?',
      onOk:()=>{this.props.deleteEntity(record._id);},
      okText: '确认',
      cancelText: '取消',
    });
  }

  getTable() {
    const { data, loading, pagination, getRowKey } = this.props;
    const columns = [
      {
        title: i18n.t('list.name'),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: i18n.t('list.description'),
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: i18n.t('list.operation'),
        key: 'action',
        width: 200,
        render: (text, record) => (
          <span>
            <span className="m-l-12 m-r-12 icon-action">
              <SettingOutlined /> {i18n.t('action.setting')}
            </span>
            <span className="m-l-12 m-r-12 icon-action">
              <Tooltip placement="top" title={i18n.t('action.edit')}>
                <EditOutlined onClick={this.editAction.bind(this, record)} />
              </Tooltip>
            </span>
            <span className="m-l-12 m-r-12 icon-action">
              <Tooltip placement="top" title={i18n.t('action.delete')}>
                <DeleteOutlined onClick={this.deleteAction.bind(this, record)} />
              </Tooltip>
            </span>
          </span>
        ),
      },
    ];

    return (
      <Table
        rowKey={getRowKey}
        pagination={pagination}
        loading={loading}
        bordered={true}
        columns={columns}
        dataSource={data}
      />
    );
  }

  render() {
    const {
      searchAction,
      isCollectionVisible,
      openCollection,
      closeCollection,
      collectionCallBack,
      entity,
    } = this.props;
    return (
      <ContentLayoutComponent>
        <Fragment key="left">
          <Input
            className="search"
            onKeyDown={searchAction}
            suffix={<SearchOutlined />}
            placeholder={i18n.t('list.search')}
          />
        </Fragment>
        <Fragment key="actions">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className={`${'action-btn'}`}
            onClick={openCollection}
          >
            {i18n.t('action.create')}
          </Button>
        </Fragment>
        <Fragment key="main">
          {this.getTable()}
          <Modal
            title={i18n.t('action.create')}
            visible={isCollectionVisible}
            width={MODAL_SIZE.md}
            destroyOnClose={true}
            footer={false}
            onCancel={closeCollection}
          >
            {
              // @ts-ignore
              <<% collection %> entity={entity} callback={collectionCallBack} />
            }
          </Modal>
        </Fragment>
      </ContentLayoutComponent>
    );
  }
}
export default listMixin(<% name %>);
