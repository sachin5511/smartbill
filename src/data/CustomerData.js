const customerColumns = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
  {
    name: 'Phone',
    selector: row => row.phone,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: row => row.amount,
    sortable: true,
  },
   {
    name: 'Recived',
    selector: row => row.amountRecived,
    sortable: true,
  },
  {
    name: 'Barrow',
    selector: row => row.barrow,
    sortable: true,
  },
  
  {
    name: 'View',
    selector: row => row.view,
    sortable: true,
  },  
 
];
export { customerColumns };
