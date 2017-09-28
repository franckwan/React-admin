/**
 * Created by 叶子 on 2017/7/31.
 */
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import AuthWidget from '@/components/widget/AuthWidget';
import beauty from '@/style/imgs/beauty.jpg';
import { Form, Input, Tooltip, Icon, Cascader, Select,  Checkbox, Button, AutoComplete,DatePicker  } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { RangePicker } = DatePicker;
const { TextArea } = Input;



class OAAuthBasic extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        startValue: null,
        endValue: null,
        endOpen: false,
        default : 0,
        default2 : 0
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (true) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        const styeApplyDate = {
            width: '100%'
        };
        const styeStartDate = {
            width: '50%'
        };
        const { startValue, endValue, endOpen } = this.state;
        const config = {
            rules: [{  message: 'Please select time!' }],
        };
        const dateFormat = 'YYYY/MM/DD';

        return (
            <div id="oajiabandiv">
                <BreadcrumbCustom first="OA管理" second="加班管理" />
                <AuthWidget
                    children={auth => (
                        <Row>
                            <Col span={24}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="申请时间"
                                    >
                                        {getFieldDecorator('applyDate',{
                                            initialValue : moment()
                                        })(
                                            <DatePicker
                                                showTime
                                                format="YYYY-MM-DD HH:mm:ss"
                                                placeholder="Select Time"
                                                allowClear="true"
                                                style={styeApplyDate}
                                                disabled = "true"
                                                // onChange={onChange}
                                                // onOk={onOk}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="加班时间"
                                    >
                                        {getFieldDecorator('range-time-picker')(
                                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="加班类型"
                                    >
                                        {getFieldDecorator('overtimeType', {
                                            initialValue : "default"
                                        })(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="default">正常加班</Option>
                                                <Option value="undefault">非正常加班</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                            <span>
                                  车费补贴&nbsp;
                                                <Tooltip title="自动计算出差车费">
                                    <Icon type="question-circle-o" />
                                  </Tooltip>
                                </span>
                                        )}
                                        hasFeedback
                                    >
                                        {getFieldDecorator('carMoney', {
                                            initialValue : this.state.default
                                        })(
                                            <Input disabled="true" />
                                        )}
                                    </FormItem>
                                   {/* <FormItem
                                        {...formItemLayout}
                                        label="Habitual Residence"
                                    >
                                        {getFieldDecorator('residence', {
                                            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                                            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
                                        })(
                                            <Cascader options={residences} />
                                        )}
                                    </FormItem>*/}
                                    <FormItem
                                        {...formItemLayout}
                                        label="餐补金额"
                                    >
                                        {getFieldDecorator('eatMoney', {
                                            initialValue : this.state.default
                                        })(
                                            <Input disabled="true"  />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="加班时长"
                                    >
                                        {getFieldDecorator('overtimeTime', {
                                            initialValue : this.state.default
                                        })(
                                            <Input disabled="true" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="获得调休"
                                    >
                                        {getFieldDecorator('tiaoxiu', {
                                            initialValue : this.state.default
                                        })(
                                            <Input disabled="true" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="备注描述"
                                    >
                                        {getFieldDecorator('memo', config)(
                                            <div>
                                                <TextArea rows={4} />
                                            </div>
                                        )}
                                    </FormItem>
                                    {/*<FormItem
                                        {...formItemLayout}
                                        label="Captcha"
                                        extra="We must make sure that your are a human."
                                    >
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                {getFieldDecorator('captcha', {
                                                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                                                })(
                                                    <Input size="large" />
                                                )}
                                            </Col>
                                            <Col span={12}>
                                                <Button size="large">Get captcha</Button>
                                            </Col>
                                        </Row>
                                    </FormItem>*/}
                                    {/*<FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                                        {getFieldDecorator('agreement', {
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                                        )}
                                    </FormItem>*/}
                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">确定</Button>
                                    </FormItem>
                                </Form>
                            </Col>
                        </Row>
                    )}
                />
            </div>
        );
    }
}

export default OAAuthBasic = Form.create()(OAAuthBasic);