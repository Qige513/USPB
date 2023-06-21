import { Handlers, PageProps } from "$fresh/server.ts";
import Alert from "@/components/Alert.tsx";
import ContentMeta from "@/components/ContentMeta.tsx";

import db from "@/utils/database.ts";
import { generateId } from "@/utils/random.ts";
import Footer from "@/components/Footer.tsx";

// https://tabler-icons-tsx.deno.dev/
import IconHomeStats from "icons/home-stats.tsx";
import IconEdit from "icons/edit.tsx";
import IconLink from "icons/link.tsx";


const temprow = await db.getEntry('entry_count');
let entry_count = 1;
if (temprow) {
  entry_count = parseInt(temprow.url);
}

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const url = form.get("url")?.toString();

    if (!url) {
      return ctx.render({'msg': '请输入内容！', 'entry_count': entry_count});
    }

    const short_code = generateId();
    entry_count++;

    try {
      await db.batch([
        `insert into short_url(short_code, url) values ('${short_code}', '${url}')`,
        `update short_url SET url = ${entry_count} where short_code = 'entry_count'`
        ]
      )
    } catch (err) {
      console.error(err);
      return new Response("服务器错误", { status: 500 });
    }
    return ctx.render(
      {'msg': `短链接，只能使用一次：https://${Deno.env.get('SITE_URL')!}/s/${short_code}`,
       'entry_count': entry_count}
    );
  },
  GET(_req, ctx) {
    return ctx.render({'entry_count': parseInt(entry_count)});
  }
};


export default function Home(props: PageProps) {
  return (
    <>
    <ContentMeta />
    <main class="container">
      <Alert message={props.data.msg} />
      <form method="post" class="center" style="width:70%">
        <fieldset>
          <textarea name="url" type="text" placeholder="url or text"/>
          <button type="submit" class="right">提交</button>
        </fieldset>
      </form>
      <div class="grid">
        <article>
          <h5><IconLink class="w-6 h-6" /> 短链接</h5>
          <p><b>以 http或https 开头的内容</b>将得到一个 302 重定向。链接类似于 https://{Deno.env.get('SITE_URL')!}/s/abcde</p>
        </article>
        <article>
          <h5><IconEdit class="w-6 h-6" /> 文本粘贴板</h5>
          <p>文本内容将被保存并显示为文章卡片</p>
        </article>
        <article>
          <h5><IconHomeStats class="w-6 h-6" /> 系统状态</h5>
          <p>已创建 {props.data.entry_count} 个链接。🎉</p>
        </article>
      </div>
      <Footer />
    </main>
    </>
  );
}