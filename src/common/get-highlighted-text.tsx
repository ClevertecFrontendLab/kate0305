export const getHighlightedText = (textForSearching: string, text: string): JSX.Element[] =>
  textForSearching.split(new RegExp(`(${text})`, 'gi')).map((match: string) => (
    <span
      data-test-id={match.toLowerCase() === text.toLowerCase() && 'highlight-matches'}
      key={Math.random()}
      style={match.toLowerCase() === text.toLowerCase() ? { color: '#ff5253' } : {}}
    >
      {match}
    </span>
  ));

export const getHighlightedText1 = (textForSearching: string, textToMatch: string[]): JSX.Element[] => {
  const matchRegex = RegExp(textToMatch.join('|'), 'ig');
  const matches = Array.from(textForSearching.matchAll(matchRegex));

  return textForSearching.split(matchRegex).map((text, index) => (
    <span key={Math.random()}>
      {text}
      <span data-test-id='hint' style={{color: '#ff5253'} }>{matches[index]}</span>
    </span>
  ));
};
