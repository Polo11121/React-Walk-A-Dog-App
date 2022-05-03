import "./Recommendations.scss";

type RecommendationsType = {
  content: string;
  type: string;
};

export const Recommendations = ({content, type}:RecommendationsType) => {
  return (
    <div className={"recommendations " + type}>
        <p className="recommendations__text">{content}</p>
        <button className={"recommendations__btn " + type}>
            Edytuj
        </button>
    </div>
  );
};
