import { PostDataType } from "@/types";

function formatNewlineToBr(text: string): string {
  return text.replace(/\n/g, "<br />");
}

function insertTextsAfterSpecificPhrase(
  text: string,
  phrase: string,
  insertTexts: string[],
): string {
  let index = 0;

  const modifiedText = text.replace(new RegExp(`${phrase}`, "g"), (match) => {
    const insertText = insertTexts[index] || "";
    index++;
    return `${match}${insertText}`;
  });

  return modifiedText.replace(/\n/g, "<br />");
}
function insertTextAboveTables(
  htmlContent: string,
  tableNumber: string[],
): string {
  let index = 0;

  const modifiedContent = htmlContent.replace(/<table/g, (match) => {
    const insertText = tableNumber[index] || "";
    index++;
    return `${insertText}<br />${match}`;
  });

  return modifiedContent;
}

type DetailHeaderProps = {
  post: PostDataType;
};

export default function DetailMainSection({ post }: DetailHeaderProps) {
  const insertTexts = [
    '<span style="color: red;"><br />1-1 [하단 참고]</span>',
    '<span style="color: red;"><br />1-2 [하단 참고]</span>',
    '<span style="color: red;"><br />1-3 [하단 참고]</span>',
  ];
  const specificPhrase = "패치가 포함되어 있습니다.";

  const tableNumber = [
    '<span style="color: red;"><br />1-1 </span>',
    '<span style="color: red;"><br />1-2 </span>',
    '<span style="color: red;"><br />1-3 </span>',
  ];
  return (
    <div className="text-xl">
      {post.description ? (
        <div className="">
          <h2 className="text-3xl font-bold leading-loose">description</h2>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: formatNewlineToBr(post.description || ""),
            }}
          />
          <br />
        </div>
      ) : (
        ""
      )}
      <div
        className="text-lg"
        dangerouslySetInnerHTML={{
          __html: insertTextsAfterSpecificPhrase(
            post.report_content,
            specificPhrase,
            insertTexts,
          ),
        }}
      />
      {post.table_content && post.table_content.length > 1 ? (
        <div className="text-lg">
          <p>4.취약점 세부정보 표</p>
          <div
            dangerouslySetInnerHTML={{
              __html: insertTextAboveTables(
                post.table_content || "",
                tableNumber,
              ),
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
