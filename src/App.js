import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [title, setTitle] = useState("");
    const [logo, setLogo] = useState(null);
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    "https://nutri-dev-a8f9a-default-rtdb.firebaseio.com/client/6cb80ab9-f4dd-4a18-adb9-70250683c2f6.json"
                );
                const data = await response.json();

                setTitle(data.title);
                setLogo(data.logo);
                setDescription(data.description);
            } catch (error) {
                setHasError(true);
                console.error("fetch error", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <p>Aguarde...</p>;
    }

    return (
        <div className="App">
            {hasError ? (
                <p>Erro ao buscar os dados do servidor.</p>
            ) : (
                <header className="App-header">
                    {logo && <img src={logo} alt="logo" />}
                    <h1>{title}</h1>
                    <p>{description}</p>
                </header>
            )}
        </div>
    );
}

export default App;
