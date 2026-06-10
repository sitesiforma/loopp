"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Plus, Leaf, Package, LogOut, Pencil, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Logo from "@/components/Logo";
import {
  getUser,
  getFornecedores,
  saveFornecedores,
  setUser as setUserStorage,
} from "@/lib/mock-data";
import {
  Fornecedor,
  CategoriaFornecedor,
  CategoriaVitrine,
  TipoEvento,
  Material,
  User,
} from "@/lib/types";

const CATEGORIAS: CategoriaFornecedor[] = [
  "Resíduos Têxteis",
  "Confecção Sustentável",
  "Energia Renovável",
  "Cenografia Sustentável",
  "Logística Verde",
  "Alimentação",
  "Outro",
];

const CATEGORIAS_VITRINE: CategoriaVitrine[] = [
  "Figurino",
  "Resíduos Têxteis",
  "Cenografia",
  "Adereços",
  "Energia",
  "Logística",
  "Decoração",
];

const TIPOS_EVENTO: TipoEvento[] = [
  "Festa",
  "Desfile",
  "Show",
  "Corporativo",
  "Casamento",
  "Formatura",
  "Outro",
];

const COR_CATEGORIA_VITRINE: Record<CategoriaVitrine, string> = {
  Figurino: "#F9E784",
  "Resíduos Têxteis": "#3A7D5A",
  Cenografia: "#3A7D5A",
  Adereços: "#F9E784",
  Energia: "#3A7D5A",
  Logística: "#3A7D5A",
  Decoração: "#F9E784",
};

const CATEGORIA_CORES: Record<CategoriaFornecedor, string> = {
  "Resíduos Têxteis": "bg-purple-900/30 text-purple-300 border-purple-800/40",
  "Confecção Sustentável": "bg-pink-900/30 text-pink-300 border-pink-800/40",
  "Energia Renovável": "bg-yellow-900/30 text-[#F9E784] border-yellow-800/40",
  "Cenografia Sustentável": "bg-[#3A7D5A]/15 text-[#4EAF7A] border-[#3A7D5A]/30",
  "Logística Verde": "bg-blue-900/30 text-blue-300 border-blue-800/40",
  Alimentação: "bg-orange-900/30 text-orange-300 border-orange-800/40",
  Outro: "bg-[#F0F0F0] text-[#888888] border-[#D0D0D0]",
};

const EMPTY_FORM = {
  nome: "",
  categoria: "" as CategoriaFornecedor | "",
  descricao: "",
  contato: "",
  tags: "",
};

const EMPTY_MATERIAL_DRAFT = {
  nome: "",
  categoria: "" as CategoriaVitrine | "",
  tiposEvento: [] as TipoEvento[],
  descricao: "",
};

export default function FornecedoresPage() {
  const router = useRouter();
  const [user, setUserState] = useState<User | null>(null);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Fornecedor | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [materiaisLocais, setMateriaisLocais] = useState<Material[]>([]);
  const [addingMaterial, setAddingMaterial] = useState(false);
  const [materialDraft, setMaterialDraft] = useState(EMPTY_MATERIAL_DRAFT);
  const [materiaisExpanded, setMateriaisExpanded] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/login"); return; }
    if (u.tipo !== "admin") { router.push("/dashboard"); return; }
    setUserState(u);
    setFornecedores(getFornecedores());
  }, [router]);

  function handleLogout() {
    setUserStorage(null);
    router.push("/");
  }

  function openAdd() {
    setEditando(null);
    setForm(EMPTY_FORM);
    setMateriaisLocais([]);
    setAddingMaterial(false);
    setMaterialDraft(EMPTY_MATERIAL_DRAFT);
    setMateriaisExpanded(false);
    setModalOpen(true);
  }

  function openEdit(f: Fornecedor) {
    setEditando(f);
    setForm({
      nome: f.nome,
      categoria: f.categoria,
      descricao: f.descricao,
      contato: f.contato,
      tags: f.tags.join(", "),
    });
    setMateriaisLocais(f.materiais ?? []);
    setAddingMaterial(false);
    setMaterialDraft(EMPTY_MATERIAL_DRAFT);
    setMateriaisExpanded((f.materiais?.length ?? 0) > 0);
    setModalOpen(true);
  }

  function handleRemoveFornecedor(id: string) {
    const updated = fornecedores.filter((f) => f.id !== id);
    saveFornecedores(updated);
    setFornecedores(updated);
    toast.success("Fornecedor removido.");
  }

  function handleRemoveMaterial(id: string) {
    setMateriaisLocais((prev) => prev.filter((m) => m.id !== id));
  }

  function handleToggleTipoEvento(tipo: TipoEvento) {
    setMaterialDraft((d) => ({
      ...d,
      tiposEvento: d.tiposEvento.includes(tipo)
        ? d.tiposEvento.filter((t) => t !== tipo)
        : [...d.tiposEvento, tipo],
    }));
  }

  function handleAddMaterial() {
    if (!materialDraft.nome || !materialDraft.categoria) {
      toast.error("Preencha nome e categoria do material.");
      return;
    }
    if (materialDraft.tiposEvento.length === 0) {
      toast.error("Selecione ao menos um tipo de evento.");
      return;
    }
    const fornecedorId = editando?.id ?? `f_new_${Date.now()}`;
    const fornecedorNome = form.nome || (editando?.nome ?? "");
    const novoMaterial: Material = {
      id: `m_${Date.now()}`,
      nome: materialDraft.nome,
      fornecedorId,
      fornecedorNome,
      categoria: materialDraft.categoria as CategoriaVitrine,
      tiposEvento: materialDraft.tiposEvento,
      descricao: materialDraft.descricao,
      cor: COR_CATEGORIA_VITRINE[materialDraft.categoria as CategoriaVitrine] ?? "#3A7D5A",
    };
    setMateriaisLocais((prev) => [...prev, novoMaterial]);
    setMaterialDraft(EMPTY_MATERIAL_DRAFT);
    setAddingMaterial(false);
    toast.success("Material adicionado.");
  }

  async function handleSalvar() {
    if (!form.nome || !form.categoria || !form.descricao || !form.contato) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));

    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editando) {
      const updated = fornecedores.map((f) =>
        f.id === editando.id
          ? {
              ...f,
              nome: form.nome,
              categoria: form.categoria as CategoriaFornecedor,
              descricao: form.descricao,
              contato: form.contato,
              tags,
              materiais: materiaisLocais.map((m) => ({
                ...m,
                fornecedorNome: form.nome,
              })),
            }
          : f
      );
      saveFornecedores(updated);
      setFornecedores(updated);
      toast.success("Fornecedor atualizado.");
    } else {
      const novoId = `f_${Date.now()}`;
      const novo: Fornecedor = {
        id: novoId,
        nome: form.nome,
        categoria: form.categoria as CategoriaFornecedor,
        descricao: form.descricao,
        contato: form.contato,
        tags,
        materiais: materiaisLocais.map((m) => ({
          ...m,
          fornecedorId: novoId,
          fornecedorNome: form.nome,
        })),
      };
      const updated = [...fornecedores, novo];
      saveFornecedores(updated);
      setFornecedores(updated);
      toast.success("Fornecedor adicionado.");
    }

    setSaving(false);
    setModalOpen(false);
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] border-r border-[#2A2A2A] flex flex-col fixed h-full z-40">
        <div className="p-5 border-b border-[#2A2A2A]">
          <Logo size="md" href="/admin" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[#888888] hover:bg-[#2A2A2A] hover:text-white font-medium text-sm transition-colors"
          >
            <Package className="h-4 w-4" />
            Pedidos
          </Link>
          <Link
            href="/admin/fornecedores"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#3A7D5A]/10 text-[#3A7D5A] font-semibold text-sm"
          >
            <Leaf className="h-4 w-4" />
            Fornecedores
          </Link>
        </nav>
        <div className="p-4 border-t border-[#2A2A2A]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-7">
            <div>
              <h1
                className="text-3xl font-bold text-[#0A0A0A]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Fornecedores
              </h1>
              <p className="text-[#888888] mt-1 text-sm">
                {fornecedores.length} fornecedor
                {fornecedores.length !== 1 ? "es" : ""} cadastrado
                {fornecedores.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Button
              onClick={openAdd}
              className="bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full gap-2 font-semibold"
            >
              <Plus className="h-4 w-4" />
              Adicionar Fornecedor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence>
              {fornecedores.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Card className="p-5 bg-[#F5F5F5] border-[#E5E5E5] rounded-2xl hover:border-[#3A7D5A]/30 transition-colors h-full flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-[#0A0A0A] leading-tight">
                        {f.nome}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border shrink-0 font-medium ${CATEGORIA_CORES[f.categoria]}`}
                      >
                        {f.categoria}
                      </span>
                    </div>
                    <p className="text-sm text-[#888888] leading-relaxed mb-3 flex-1">
                      {f.descricao}
                    </p>
                    <p className="text-xs text-[#3A7D5A] mb-3">{f.contato}</p>
                    {f.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {f.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-[#3A7D5A]/8 text-[#3A7D5A] px-2 py-0.5 rounded-full border border-[#3A7D5A]/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {(f.materiais?.length ?? 0) > 0 && (
                      <p className="text-xs text-[#888888] mb-3">
                        {f.materiais!.length} material
                        {f.materiais!.length !== 1 ? "is" : ""} na vitrine
                      </p>
                    )}
                    <div className="flex gap-2 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(f)}
                        className="flex-1 border-[#E5E5E5] text-[#888888] hover:text-[#0A0A0A] hover:border-[#3A7D5A]/40 rounded-full gap-1"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFornecedor(f.id)}
                        className="border-red-900/40 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-full gap-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-white border-[#E5E5E5] rounded-2xl max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-[#0A0A0A]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {editando ? "Editar fornecedor" : "Novo fornecedor"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="font-medium text-[#0A0A0A] text-sm">
                Nome da empresa *
              </Label>
              <Input
                placeholder="Ex: EcoFest Energia"
                value={form.nome}
                onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="font-medium text-[#0A0A0A] text-sm">Categoria *</Label>
              <Select
                value={form.categoria}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, categoria: v as CategoriaFornecedor }))
                }
              >
                <SelectTrigger className="border-[#E5E5E5] bg-white text-[#0A0A0A] rounded-full h-10">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="font-medium text-[#0A0A0A] text-sm">Descrição *</Label>
              <Textarea
                placeholder="Descreva o que o fornecedor oferece"
                value={form.descricao}
                onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
                className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-2xl min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="font-medium text-[#0A0A0A] text-sm">Contato *</Label>
              <Input
                placeholder="email@fornecedor.com ou (11) 99999-9999"
                value={form.contato}
                onChange={(e) => setForm((f) => ({ ...f, contato: e.target.value }))}
                className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="font-medium text-[#0A0A0A] text-sm">
                Tags{" "}
                <span className="text-[#888888] font-normal">(separadas por vírgula)</span>
              </Label>
              <Input
                placeholder="solar, eventos, reciclagem"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-10"
              />
            </div>

            {/* Seção de materiais */}
            <div className="border-t border-[#E5E5E5] pt-4">
              <button
                type="button"
                onClick={() => setMateriaisExpanded((v) => !v)}
                className="flex items-center justify-between w-full text-sm font-semibold text-[#0A0A0A] mb-3"
              >
                <span>
                  Materiais disponíveis{" "}
                  <span className="text-[#888888] font-normal">({materiaisLocais.length})</span>
                </span>
                {materiaisExpanded ? (
                  <ChevronUp className="h-4 w-4 text-[#888888]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#888888]" />
                )}
              </button>

              <AnimatePresence>
                {materiaisExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {materiaisLocais.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {materiaisLocais.map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between gap-2 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl px-3 py-2"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[#0A0A0A] truncate">
                                {m.nome}
                              </p>
                              <p className="text-xs text-[#888888]">
                                {m.categoria} ·{" "}
                                {m.tiposEvento.slice(0, 2).join(", ")}
                                {m.tiposEvento.length > 2 && " ..."}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveMaterial(m.id)}
                              className="text-red-400 hover:text-red-300 p-1 rounded transition-colors shrink-0"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {addingMaterial ? (
                      <div className="bg-[#F5F5F5] rounded-2xl p-4 space-y-3 border border-[#E5E5E5]">
                        <p className="text-xs font-semibold text-[#0A0A0A]">
                          Novo material
                        </p>
                        <Input
                          placeholder="Nome do material *"
                          value={materialDraft.nome}
                          onChange={(e) =>
                            setMaterialDraft((d) => ({ ...d, nome: e.target.value }))
                          }
                          className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-9 text-sm"
                        />
                        <Select
                          value={materialDraft.categoria}
                          onValueChange={(v) =>
                            setMaterialDraft((d) => ({ ...d, categoria: v as CategoriaVitrine }))
                          }
                        >
                          <SelectTrigger className="border-[#E5E5E5] bg-white text-[#0A0A0A] rounded-full h-9 text-sm">
                            <SelectValue placeholder="Categoria *" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIAS_VITRINE.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div>
                          <p className="text-xs font-medium text-[#0A0A0A] mb-2">
                            Tipos de evento *
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {TIPOS_EVENTO.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => handleToggleTipoEvento(t)}
                                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                                  materialDraft.tiposEvento.includes(t)
                                    ? "bg-[#3A7D5A] text-white border-[#3A7D5A]"
                                    : "bg-transparent text-[#888888] border-[#E5E5E5] hover:border-[#3A7D5A]/40 hover:text-[#0A0A0A]"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                        <Textarea
                          placeholder="Descrição curta"
                          value={materialDraft.descricao}
                          onChange={(e) =>
                            setMaterialDraft((d) => ({ ...d, descricao: e.target.value }))
                          }
                          className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-2xl min-h-[60px] resize-none text-sm"
                        />
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setAddingMaterial(false);
                              setMaterialDraft(EMPTY_MATERIAL_DRAFT);
                            }}
                            className="flex-1 border-[#E5E5E5] text-[#888888] hover:text-[#0A0A0A] rounded-full h-8"
                          >
                            Cancelar
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleAddMaterial}
                            className="flex-1 bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full h-8"
                          >
                            Adicionar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setAddingMaterial(true)}
                        className="flex items-center gap-1.5 text-sm text-[#3A7D5A] hover:text-[#4EAF7A] font-medium transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Adicionar material
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!materiaisExpanded && (
                <button
                  type="button"
                  onClick={() => setMateriaisExpanded(true)}
                  className="flex items-center gap-1.5 text-sm text-[#3A7D5A] hover:text-[#4EAF7A] font-medium transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Gerenciar materiais
                </button>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="flex-1 border-[#E5E5E5] text-[#888888] hover:text-[#0A0A0A] rounded-full h-10"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSalvar}
                disabled={saving}
                className="flex-1 bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full h-10 font-semibold"
              >
                {saving
                  ? "Salvando..."
                  : editando
                  ? "Salvar alterações"
                  : "Adicionar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
