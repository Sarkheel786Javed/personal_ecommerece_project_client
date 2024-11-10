import { ProductService } from "../../../Services/ProductServices/ProductServices";
import { useAuth } from "../../../app/createContextAuth/createContex";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CommonModal2 from "../../CommonModal2/CommonModal2";
import { TextField } from "@mui/material";
import {
  Category,
} from "../../../Model/DepartmentProductModel/DepartmentProductModel";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function ManageProductCategory() {
  const [auth] = useAuth();
  const [productsCategoryTable, setProductsCategoryTable] = useState<
  Category[]
  >([]);
  const [searchString, setSearchString] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (auth?._id) {
      setUserId(String(auth._id));
    }
  }, [auth._id]);

  useEffect(() => {
    if (userId) {
      getAllProductsCategory();
    }
  }, [userId]);

  const getAllProductsCategory = async () => {
    try {
      const response = await ProductService.getCategories({
        params: {
          userId,
          searchString,
        },
      });

      if (response.data && response.data.length > 0) {
        setProductsCategoryTable(response.data);
      } else {
        setProductsCategoryTable([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const searchCategory = async (e: React.KeyboardEvent<HTMLElement>) => {
    // if (e.key === "Enter") {
      try {
        await ProductService.getCategories({
          params: {
            userId,
            searchString,
          },
        }).then((response) => {
          if (response.data.length > 0) {
            setProductsCategoryTable(response.data);
          }
        });
      } catch (error) {
        setProductsCategoryTable([]);
        console.error("Error fetching products:", error);
      }
    // }
  };

  const [show, setShow] = useState(false);
  const initialValues = {
    _id: "0",
    categoryName: "",
    organization: "",
    totalCategories:0
  };
  const [editValues, setEditValue] = useState<Category>(initialValues);
  const handleClose = () => {
    setShow(false);
    setEditValue(initialValues);
  };
  const handleSetValue = (data: Category) => {
    setEditValue(data);
    setShow(true);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handledeleteProduct = async (CategoryId: string) => {
    try {
      const response = await ProductService.DeleteCategories(CategoryId);
      if (response.data.response === true) {
        Toast.fire({
          showCloseButton: true,
          icon: "success",
          title: response.data.message,
        });
      }
      getAllProductsCategory();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  function TableComponent() {
    return (
      <div className="w-100">
        {productsCategoryTable && productsCategoryTable.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Category Name</th>
                <th scope="col">Organization</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {productsCategoryTable.map((row: any) => (
                <tr key={row._id}>
                  <th scope="row">{row.categoryName}</th>
                  <td>{row.organization}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSetValue(row)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handledeleteProduct(row._id!)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Product Found</p>
        )}
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex flex-wrap justify-content-end align-items-center py-5 gap-3">
        <input
          type="text"
          className="input_table"
          onChange={(e) => setSearchString(e.target.value)}
          onKeyUp={(e) => searchCategory(e)}
        />
        <Button variant="primary" onClick={handleShow}>
          Add New Product
        </Button>
      </div>
      <div className="">
        <TableComponent />
      </div>
      {show && (
        <CommonModal2
          show={show}
          editValues={editValues}
          getAllProductsCategoryProps={getAllProductsCategory}
          modalNameProp={"ProductCategory"}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      )}
    </div>
  );
}

export default ManageProductCategory;

export const AddProductCategory = (props: any) => {
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState<boolean>(false);

  const [auth] = useAuth();
  useEffect(() => {
    if (props.editValues._id > "0") {
      setCategory(props.editValues.categoryName);
    }
  }, []);
  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission behavior
  
    const data = {
      categoryId: props.editValues._id !== "0" ? props.editValues._id : props.editValues._id,
      categoryName: category,
    };
  
    if (category.trim() === "") {
      setCategoryError(true);
      return;
    } else {
      setCategoryError(false);
    }
  
    try {
      const res = await ProductService.createCategories(data);
      if (res.data) {
        props.getAllProductsCategoryProps();
        props.handleClose();
        Toast.fire({
          icon: "success",
          title: props.editValues._id > "0" ? "Category updated successfully" : "Category created successfully",
        });
        setCategory(""); // Reset the category input after successful submission
      }
    } catch (error) {
      console.error("Error in adding/updating category:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to add/update category",
      });
    }
  };
  

  const addCategory = (e: any) => {
    setCategory(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleAddCategory} className="d-block">
        <TextField
          id="outlined-helperText"
          label="Add product Category Name"
          fullWidth
          required
          defaultValue="Category Name"
          helperText={categoryError === true ? "Add Category Name" : ""}
          value={category}
          onChange={addCategory}
        />
        <button type="submit" className="btn btn-primary w-100 my-3">
          {props.editValues._id > "0" ? (
            <>Update Category</>
          ) : (
            <>Save Category</>
          )}
        </button>
      </form>
    </>
  );
};
