
import { ProductModel } from "../../Model/DepartmentProductModel/DepartmentProductModel";
import { AddDepartmentProduct } from "../departmentManagement/ManageProduct/ManageProduct";

interface CommonModalProps {
    show: boolean;
    getAllProductsProp: () => void;
    editvaluesprop: ProductModel;
    modalnameprop: string;
    onHide: () => void;
  }


const CommonModal: React.FC<CommonModalProps> = (props) => {
       

        return (
            <>
                <div
                    // className={`modal ${props.show ? 'show' : ''}  modal_bg_transparent `}
                    className={`modal`}
                    tabIndex={parseInt('-1', 10)}
                    role='dialog'
                    style={{ display: props.show ? 'block' : 'none' }}
                >
                    <div>
                        <div className={`modal-dialog modal-lg my-2`} role='document'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title'>
                                        {/* <b>
                                            {getModalHeader(props)}
                                        </b> */}
                                        <b>
                                            {props.editvaluesprop._id! > "0"
                                                ? props.modalnameprop === 'DepartmentProduct'
                                                    ? 'Edit Product'
                                                    : props.modalnameprop === ''
                                                        ? ""
                                                        : ''
                                        : props.modalnameprop === 'DepartmentProduct'
                                                    ? 'Add Product'

                                                    : props.modalnameprop === ''
                                                        ? ''
                                                        : ''}
                                        </b>
                                    </h5>
                                    <button
                                        type='button'
                                        className='close hover-button'
                                        style={{ width: '30px' }}
                                        data-dismiss='modal'
                                        aria-label='Close'
                                        onClick={() =>   props.onHide()}
                                    >
                                        <span aria-hidden='true'>&times;</span>
                                    </button>
                                </div>
                                <div className='modal-body'>
                                    {props.modalnameprop === 'DepartmentProduct' 
                                    ? (
                                        <AddDepartmentProduct 
                                        editvaluesprop={props.editvaluesprop} 
                                        getAllProductsProp={props.getAllProductsProp} 
                                        onHide={props.onHide}
                                      />
                                     )
                                    :""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </>
        )
    }

    export default CommonModal
