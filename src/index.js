const { React } = figmaPlus;
import "./styles.scss";

const App = () => {
  const [value, setValue] = figmaPlus.React.useState("");
  const handleClick = async () => {
    const data = await fetch(
      `https://fish-text.ru/get?format=json&number=${value}`
    ).then(response => response.json());

    await figmaPlus.currentPage.selection[0]
      .getProperties()
      .then(node => (node.characters = data.text));

    figmaPlus.hideUI("Лорем, сколько предложений?");
  };

  return (
    <div className={"STYLE"}>
      <input value={value} onChange={({ target }) => setValue(target.value)} />
      <button onClick={handleClick}>Click me plz</button>
    </div>
  );
};

figmaPlus.addCommand({
  label: "Lorem Ipsum RUS",
  action: () => {
    figmaPlus.showUI({
      title: "Лорем, сколько предложений?",
      reactComponent: App
    });
  }
});
