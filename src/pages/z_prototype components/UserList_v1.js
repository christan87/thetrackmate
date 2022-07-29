import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import '../../styles/userList.css'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    maxWidth: 250
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [value, setValue] = React.useState([]);
  
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

//=============================
//=========CUSTOM CODE=========
//=============================  
  const handleChangeMultiple = (event) => {
    /*
    the options array on event.target has a property "selectedIndex" which
    keep track of the index of the most recently selected option 
    */
    const opIndex = event.target.options.selectedIndex;
    const { options } = event.target;
    /*
    this if statement check to see if the value of the most recently selected
    option already exists in the values array. If it does not then the value is
    added and if it does exist then it's removed and the options "selected" property
    is set to false.

    =>NOTE<=: The add/remove should be done based on user id and not name which should be
    the next step with this function
    */
    if(value.includes(options[opIndex].value) === false){
        value.push(options[opIndex].value);
        // console.log("Added")
        // console.log("Value :", value)
    }else{
        const removeIndex = value.indexOf(options[opIndex].value);
        if(removeIndex !== -1){
            if(value.length < 2){
                setValue([])
                event.target.options[opIndex].selected = false
            }
            value.splice(removeIndex, 1)
            event.target.options[opIndex].selected = false
        }
        // console.log("Removed")
        // console.log("Value :", value)
    }
    // for (let i = 0, l = options.length; i < l; i += 1) {
    //   if (options[i].selected) {
    //     value.push(options[i].value);
    //   }
    // }
    setPersonName(value);
  };

  return (
    <div >
      <FormControl className={classes.formControl} >
        <InputLabel shrink htmlFor="select-multiple-native">
            Users
        </InputLabel>
        <Select
          multiple
          native
          value={personName}
          onChange={handleChangeMultiple}
          inputProps={{
            id: 'select-multiple-native'
          }}
        >  
          {names.map((name) => (
            <option style={{minWidth: "15rem"}} key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
