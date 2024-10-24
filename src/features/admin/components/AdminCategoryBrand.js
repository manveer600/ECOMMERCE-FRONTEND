import { useState } from "react"
import { useDispatch } from "react-redux";
import { addEventAsync } from "../../product/productSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminCategoryBrand() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('categories');
    const [isLoading, setIsloading] = useState(false);
    const handleChange = (e) => {
        setInputValue(e.target.value);
        console.log('inputted value is this', e.target.value);
    }
    const handleValue = (e) => {
        setSelectedValue(e.target.value);
        console.log('selected value is this', e.target.value);
    }

    const addEvent = async () => {
        console.log('hello')
        const data = { event: selectedValue, value: inputValue };
        // BASICALLY data = { event: 'category', value: 'hello' };
        // OR data = { event: 'brand', value: 'hello' };
        setIsloading(true);
        const response = await dispatch(addEventAsync(data));
        setIsloading(false);
        if (response?.payload?.success) {
            toast.success(response?.payload?.message, {
                duration: 1000,
                id: 'eventAddedSuccess'
            });
            setInputValue('');
            navigate('/admin');
            return;
        } else {
            return toast.error(response?.payload?.message, {
                duration: 2000,
                id: 'eventAddedFailure'
            });
        }
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen font-serif font-bold">
            <h1 className="font-bold text-xl sm:text-3xl ">What do you want to add?</h1>

            <div className="space-x-1 text-center space-y-1 mt-2">
                <select className="rounded" onChange={handleValue}>
                    <option value='categories'>Category</option>
                    <option value='brands'>Brand</option>
                </select>
                <input
                    className="rounded"
                    type="text"
                    value={inputValue}
                    placeholder={`Enter ${selectedValue} name.`}
                    onChange={(e) => handleChange(e)} />
            </div>

            {inputValue !== '' && <button disabled={isLoading} onClick={addEvent} className="mt-2 rounded-lg bg-yellow-500 p-3 hover:bg-blue-400">
                {
                    isLoading ? <div className="spinner" /> : `Add ${selectedValue}`
                }
            </button>}
        </div>
    )
}