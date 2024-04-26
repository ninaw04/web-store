import { TextFields } from "@mui/icons-material";

export default function SearchBar(props) {
  const query = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const queryVal = query.current.value;
    props.fetchProducts(queryVal.trim());
  };

  const classes = useStyles();

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <TextFields
        className="search-bar"
        autoFocus={true}
        inputRef={query}
        id="outlined-full-width"
        placeholder="Products"
        fullWidth
        margin="normal"
      />
    </form>
  );
}
