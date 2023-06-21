import { Head } from "$fresh/runtime.ts";

const DESCRIPTION = "一个文本和网址托管的服务";
const KEYWORDS = [
  "url shorter",
  "paste bin",
  "Qige",
];
const TITLE = '文本网址托管服务 - ' + Deno.env.get("SITE_URL");

const TYPE = "website";
const LOCALE = "zh-CN";


export default function ContentMeta() {
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:type" content={TYPE} />
      <meta property="og:locale" content={LOCALE} />
      <meta name="keywords" content={KEYWORDS.join(", ")} />
      <link rel="stylesheet" href="https://cdn.staticfile.org/picocss/1.5.10/pico.min.css" crossorigin="anonymous" />
      <link rel="stylesheet" href="/style.css" />
    </Head>
  );
}
