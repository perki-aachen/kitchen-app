import Header from "./Header";
import InputArea from "./InputArea";
import Ingredients from "./Ingredients";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios
      .get("/api/ingredients")
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function addIngredients(inputText) {
    const newIngredient = {
      name: inputText[0],
      amount: inputText[1],
    };

    axios.post("/api/ingredients/add", newIngredient).then((res) => {
      setIngredients((prevValue) => {
        console.log(res.data);
        return [...prevValue, res.data];
      });
    });
  }

  function deleteItem(id) {
    axios.delete("/api/ingredients/" + id).then((res) => console.log(res));
    axios
      .get("/api/ingredients")
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="background-image">
      <Header />
      <InputArea addItem={addIngredients} />
      <div className="ingredients-list">
        <table className="fixed">
          <colgroup>
            <col width="85%" />
            <col width="15%" />
          </colgroup>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Amount</th>
            </tr>
            {ingredients?.map((ingredient, index) => {
              return (
                <Ingredients
                  key={index}
                  id={index}
                  itemName={ingredient}
                  deleteItem={deleteItem}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default App;
