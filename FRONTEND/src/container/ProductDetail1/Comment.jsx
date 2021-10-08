import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { toastSuccess, toastError } from './../../Helper/toastHelper';
import ProductService from '../../services/product.service';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        className="comment-list"
        header={`${comments.length} bình luận`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
            <li>
                <Comment
                    actions={<span key="comment-list-reply-to-0">Bình luận</span>}
                    author={item.user.username}
                    avatar={item.user.profile?.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                    content={item.content}
                    datetime={moment(item.created_at).format('H:m:s MM/DD/YYYY')}
                />
            </li>
        )}
    />
);

const Editor = ({ onChange, onSubmit, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" onClick={onSubmit} type="primary">
                Bình luận
            </Button>
        </Form.Item>
    </>
);

export default function Index({ idProduct, user }) {
    const [item, setItem] = useState({
        title: "bình luận",
        content: "",
        email: "",
        username: ""
    })
    const [checkBuy, setCheckBuy] = useState(0);
    const [comments, setComments] = useState([])

    useEffect(() => {
        if (user) {
            setItem({
                ...item,
                email: user.email,
                username: user.username,
                user_id: user.id,
                product_id: idProduct
            })
        }
        let mounted = true;
        if (mounted && idProduct) {
            ProductService.getComment({ id: idProduct })
                .then(data => {
                    if (data.success) {
                        setComments(data.data.items);
                        setCheckBuy(data.data.check);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        return () => mounted = false;
    }, [])

    const handleSubmit = () => {
        if (!item) {
            return;
        }
        ProductService.addComment(item)
            .then(data => {
                if (data.success) {
                    setComments([
                        data.data,
                        ...comments,
                    ])
                    toastSuccess("Bình luận thành công");
                }
            })
            .catch(err => {
                console.log(err)
            })
    };

    const handleChange = e => {
        setItem({
            ...item,
            content: e.target.value
        });
    };

    return (
        <>
            {
                comments.length > 0 &&
                <CommentList comments={comments} />
            }
            {
                checkBuy > 0 && (
                    <Comment
                        avatar={
                            <Avatar
                                src={user.profile?.avatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                            />
                        }
                        content={
                            <Editor
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                value={item.content}
                            />
                        }
                    />
                )
            }
        </>
    )
}