import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataPoint {
  name: string;
  value: number;
  target: number;
}

interface ChartState {
  originalData: DataPoint[];
  modifiedData: DataPoint[];
  activeVariables: string[];
}

const initialState: ChartState = {
  originalData: [
    { name: 'Apr', value: 40000, target: 35000 },
    { name: 'May', value: 50000, target: 45000 },
    { name: 'Jun', value: 40000, target: 38000 },
    { name: 'Jul', value: 89600, target: 85000 },
    { name: 'Aug', value: 61000, target: 60000 },
    { name: 'Sep', value: 32000, target: 35000 },
    { name: 'Oct', value: 58000, target: 55000 },
  ],
  modifiedData: [
    { name: 'Apr', value: 40000, target: 35000 },
    { name: 'May', value: 50000, target: 45000 },
    { name: 'Jun', value: 40000, target: 38000 },
    { name: 'Jul', value: 89600, target: 85000 },
    { name: 'Aug', value: 61000, target: 60000 },
    { name: 'Sep', value: 32000, target: 35000 },
    { name: 'Oct', value: 58000, target: 55000 },
  ],
  activeVariables: [],
};

// Multipliers specific to each data point name for non uniform chart distr
const itemSpecificStaticMultipliers: Record<string, number> = {
  'Apr': 1.05,
  'May': 0.95,
  'Jun': 1.10,
  'Jul': 0.90,
  'Aug': 1.02,
  'Sep': 0.98,
  'Oct': 1.07,
};


const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    applyVariables: (state, action: PayloadAction<string[]>) => {
      // Sort and store the active variables from the payload
      state.activeVariables = [...action.payload].sort(); 

      const totalMultiplier = state.activeVariables.reduce((acc, currVar) => {
        return acc * getMultiplierForVariable(currVar);
      }, 1);

       // Map over the original data to create a new modified data array
      state.modifiedData = state.originalData.map(item => {
        const staticItemMultiplier = itemSpecificStaticMultipliers[item.name] || 1;

        const newValue = item.value * totalMultiplier * staticItemMultiplier;

        return {
          ...item,
          value: Math.round(newValue),
        };
      });
    },
    resetData: (state) => {
      state.modifiedData = [...state.originalData];
      state.activeVariables = [];
    },
  },
});

// Helper function to get the multiplier for a given variable.
function getMultiplierForVariable(variable: string): number {
  const multipliers: Record<string, number> = {
    'CO2 Emission': 0.8,
    'Fleet Sizing': 1.3,
    'Parking Rate': 0.7,
    "Border Rate": 0.9,
    'Carbon 1': 1.5,
    'Request rate': 0.9,
    'Battery Recharge': 1.7,
    'Maintainenece Charge': 1.6
  };
  return multipliers[variable] || 1;
}

export const { applyVariables, resetData } = chartSlice.actions;
export default chartSlice.reducer;