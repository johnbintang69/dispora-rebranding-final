import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulating API calls with localStorage
const fetchFromLocalStorage = () => {
  const data = localStorage.getItem('droughtData');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('droughtData', JSON.stringify(data));
};

export const fetchDroughtData = createAsyncThunk(
  'droughtData/fetchDroughtData',
  async () => {
    return fetchFromLocalStorage();
  }
);

export const addDroughtData = createAsyncThunk(
  'droughtData/addDroughtData',
  async (newData) => {
    const data = fetchFromLocalStorage();
    const dataToAdd = { ...newData, id: Date.now() };
    data.push(dataToAdd);
    saveToLocalStorage(data);
    return dataToAdd;
  }
);

export const updateDroughtData = createAsyncThunk(
  'droughtData/updateDroughtData',
  async (updatedData) => {
    const data = fetchFromLocalStorage();
    const index = data.findIndex(item => item.id === updatedData.id);
    if (index !== -1) {
      data[index] = updatedData;
      saveToLocalStorage(data);
    }
    return updatedData;
  }
);

export const deleteDroughtData = createAsyncThunk(
  'droughtData/deleteDroughtData',
  async (id) => {
    const data = fetchFromLocalStorage();
    const updatedData = data.filter(item => item.id !== id);
    saveToLocalStorage(updatedData);
    return id;
  }
);

const droughtDataSlice = createSlice({
  name: 'droughtData',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDroughtData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDroughtData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDroughtData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addDroughtData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateDroughtData.fulfilled, (state, action) => {
        const index = state.data.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteDroughtData.fulfilled, (state, action) => {
        state.data = state.data.filter(item => item.id !== action.payload);
      });
  },
});

export default droughtDataSlice.reducer;

