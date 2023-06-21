
export default function HeaderNav() {
    return (
        <nav class="container">
            <ul>
                <li><a href="/"><kbd>{Deno.env.get("SITE_URL")}</kbd></a></li>
            </ul>
            <ul>
                <li>首页</li>
            </ul>
        </nav>
    );
}
