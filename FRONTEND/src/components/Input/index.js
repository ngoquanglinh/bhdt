import React from 'react';
import { Input as AntdInput, Typography } from "antd";
import PropTypes from 'prop-types';
const { Text } = Typography;
const { TextArea } = AntdInput;


function Index({ label, name, control, defaultValue, error, onChange, value, placeholder, type, tag, rows, disabled }) {

    return (
        <div>
            {
                label && <label className="mb-1 d-flex" htmlFor={name}>{label}</label>
            }
            {
                tag == 'input' ?
                    <AntdInput
                        type={type}
                        value={value}
                        onChange={onChange}
                        id={name}
                        defaultValue={defaultValue}
                        name={name}
                        control={control}
                        className={error && 'input--danger'}
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                    :
                    <TextArea
                        rows={rows}
                        value={value}
                        onChange={onChange}
                        id={name}
                        disabled={disabled}
                        defaultValue={defaultValue}
                        name={name}
                        control={control}
                        className={error && 'input--danger'}
                        placeholder={placeholder}
                    />
            }

            {
                error && <Text type="danger text--danger">{error.message}</Text>
            }
        </div>
    )
}
Index.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.object,
    defaultValue: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    tag: PropTypes.string,
    rows: PropTypes.number,
    disabled: PropTypes.bool,
}

Index.defaultProps = {
    placeholder: "",
    type: "text",
    tag: "input",
    rows: 4,
    disabled: false
}
export default Index;