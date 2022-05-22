import React, { useState } from 'react';
import { times } from './times';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

export const TimeView = (props: any) => {
  const [ selected, setSelected ] = useState('');
  const [ selectedDate, setSelectedDate ] = useState(new Date());

  const styles = makeStyles({
    red: {
      color: 'red',
    },
    listItem: {
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      '&:hover, &.active': {
        fontSize: '24px',
        fontWeight: '700'
      },
    },
    listView: {
      height: '200px',
      overflow: 'scroll',
    }
  });

  const classes = styles();

  const onClick = (time: string) => {
    const ampm = time.slice(6);
    const add = ampm === 'AM' ? 0 : 12;
    setSelected(time);
    const date = props.date;
    date.setHours(Number(time.slice(0, 2)) + add);
    date.setMinutes(Number(time.slice(3, 5)));
    props.onMinutesChange(date, true);
    setSelectedDate(date);
  };

  const onDateChange = (e: any) => {
    const time = e.currentTarget.value;
    const [h, m] = time.split(':');
    setSelected(time);
    const date = props.date;
    date.setHours(Number(h));
    date.setMinutes(Number(m));
    props.onMinutesChange(date, true);
    setSelectedDate(date);
  };

  return (<Box>
    <Box className={classes.listView}>
      {times.map((ele, index) => (<Box onClick={() => onClick(ele)} className={`${classes.listItem} ${selected === ele ? 'active': ''}`} key={index}>{ele}</Box>))}
    </Box>
    <hr />
    <div style={{ textAlign: 'center' }}>
      <TextField variant="outlined"  size="small" style={{ width: '140px' }} type="time" value={(new Date(selectedDate)).toTimeString().slice(0, 5)} onChange={(e) => onDateChange(e)} id="birthdaytime" name="birthdaytime" />
      <br />
    </div>
  </Box>);
}
