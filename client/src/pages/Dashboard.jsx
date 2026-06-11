import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
const navigate = useNavigate();
const [customers, setCustomers] = useState([]);

const [formData, setFormData] = useState({
name: "",
email: "",
phone: "",
company: "",
});

const [editId, setEditId] = useState(null);
const [search, setSearch] = useState("");

const fetchCustomers = async () => {
try {
const res = await axios.get(
"http://localhost:5000/api/customers"
);

  setCustomers(res.data);
} catch (error) {
  console.log(error);
}

};

useEffect(() => {
fetchCustomers();
}, []);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  if (editId) {
    await axios.put(
      `http://localhost:5000/api/customers/${editId}`,
      formData
    );

    alert("Customer Updated Successfully");
  } else {
    await axios.post(
      "http://localhost:5000/api/customers",
      formData
    );

    alert("Customer Added Successfully");
  }

  setFormData({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  setEditId(null);
  fetchCustomers();
} catch (error) {
  console.log(error);
  alert("Operation Failed");
}

};

const editCustomer = (customer) => {
 console.log("EDIT CLICKED", customer);

setFormData({
name: customer.name,
email: customer.email,
phone: customer.phone,
company: customer.company,
});

setEditId(customer._id);
};

const deleteCustomer = async (id) => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this customer?"
);

if (!confirmDelete) return;

try {
await axios.delete(
`http://localhost:5000/api/customers/${id}`
);

alert("Customer Deleted Successfully");
fetchCustomers();

} catch (error) {
console.log(error);
}
};

const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

return (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-6xl mx-auto">

    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
  👥 Customers
</h2>

     <div className="flex gap-3">
  <div className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow">
    Total Customers: {customers.length}
  </div>

  <button
    onClick={logout}
    className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600"
  >
    Logout
  </button>
</div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">
        {editId ? "Update Customer" : "Add Customer"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          {editId
            ? "Update Customer"
            : "Add Customer"}
        </button>
      </form>
    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Customers
      </h2>

    <input
  type="text"
  placeholder="🔍 Search Customer..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border p-3 rounded-lg mb-4 w-full"
/>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
         {customers
         .filter((customer) =>
         customer.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((customer) => (
              <tr
  key={customer._id}
  className="hover:bg-blue-50 transition-all duration-300"
>
                <td className="p-3">
                  {customer.name}
                </td>

                <td className="p-3">
                  {customer.email}
                </td>

                <td className="p-3">
                  {customer.phone}
                </td>

                <td className="p-3">
                  {customer.company}
                </td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      editCustomer(customer)
                    }
                    className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteCustomer(customer._id)
                    }
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>

  </div>
</div>

);
}

export default Dashboard;
