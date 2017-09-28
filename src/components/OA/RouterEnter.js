/**
 * Created by 叶子 on 2017/8/1.
 */
/**
 * Created by 叶子 on 2017/7/31.
 */
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import AuthWidget from '@/components/widget/AuthWidget';
import { Select } from 'antd';
const Option = Select.Option;


class OARouterEnter extends Component {
    render() {
        return (
            <div>
                <Select defaultValue="lucy" style={{ width: 120 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Select defaultValue="lucy" style={{ width: 120 }} allowClear disabled>
                    <Option value="lucy">Lucy</Option>
                </Select>
            </div>
        )
    }
}

export default OARouterEnter;