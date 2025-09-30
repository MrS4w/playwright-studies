import test, { expect, Page } from "@playwright/test";

async function criarColaboradorGenerico(
  page: Page,
  nome: string,
  cargo: string,
  imagem: string,
  time: string
) {
  const botaoCriar = page.getByRole("button", { name: "Criar card" });

  await page.fill("input[placeholder='Digite seu nome ']", nome);
  await page.fill("input[placeholder='Digite seu cargo ']", cargo);
  await page.fill("input[placeholder='Informe o endereço da imagem ']", imagem);
  await page.selectOption("select", time);
  await botaoCriar.click();
}

test.describe("Testes sistem Organo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://organo-ashy-sigma.vercel.app/");
  });

  test("verificar se há um header com imagem", async ({ page }) => {
    const headerImage = page.locator("header>img[alt='Logo do Organo']");

    await expect(headerImage).toBeVisible();
  });

  test("verificar se há um footer", async ({ page }) => {
    const footerImage = page.locator("footer");

    await expect(footerImage).toBeVisible();
  });

  test('Preencher form de novo colaborador e verificar se o mesmo aparece na seção "Time"', async ({
    page,
  }) => {
    const nome = "Victor Antonio";
    const cargo = "Dev Front-End";
    const imagem = "https://github.com/mrs4w.png";
    const time = "Front-End";
    await criarColaboradorGenerico(page, nome, cargo, imagem, time);
    const novoColaborador = page.locator(`.colaborador:has-text('${nome}')`);
    await expect(novoColaborador).toBeVisible();
    await expect(novoColaborador).toContainText(cargo);
    await expect(novoColaborador.locator("img")).toHaveAttribute("src", imagem);
  });

  test('Preencher form de novo time e verificar se o mesmo aparece na seção "Time"', async ({
    page,
  }) => {
    const nomeTime = "Quality Assurance";
    const corTime = "#ff0000";
    const botaoCriarTime = page.getByRole("button", {
      name: "Criar um novo time",
    });

    await page.fill("input[placeholder='Digite o nome do time']", nomeTime);
    await page.fill("input[type='color']", corTime);
    await botaoCriarTime.click();
    const novoTime = page.locator(`section.time:has-text('${nomeTime}')`);

    const nome = "Ana Luísa";
    const cargo = "QA Engineer";
    const imagem = "https://github.com/ana.png";

    await criarColaboradorGenerico(page, nome, cargo, imagem, nomeTime);

    await expect(novoTime).toBeVisible();
    const novoColaborador = page.locator(`.colaborador:has-text('${nome}')`);
    await expect(novoColaborador).toBeVisible();
    await expect(novoColaborador).toContainText(cargo);
    await expect(novoColaborador.locator("img")).toHaveAttribute("src", imagem);
  });
});
