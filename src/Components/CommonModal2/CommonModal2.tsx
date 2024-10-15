import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { AddProductCategory } from '../departmentManagement/ManageProductCategory/ManageProductCategory'
import { AddDepartmentProduct } from '../departmentManagement/ManageProduct/ManageProduct'

function CommonModal2(props: any) {
    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.editValues._id && props.editValues._id > "0"
                            ? props.modalNameProp === 'ProductCategory'
                                ? 'Edit Category'
                                : props.modalNameProp === 'DepartmentProduct'
                                    ? 'Edit Product'
                                    : ""
                            : props.modalNameProp === 'ProductCategory'
                                ? 'Add Category'
                                : props.modalNameProp === 'DepartmentProduct'
                                    ? 'Add Product'
                                    : ""
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        props.modalNameProp === "ProductCategory"
                            ? <AddProductCategory  {...props} />
                            : props.modalNameProp === "DepartmentProduct"
                                ? <AddDepartmentProduct  {...props} />
                                : ""
                    }
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default CommonModal2