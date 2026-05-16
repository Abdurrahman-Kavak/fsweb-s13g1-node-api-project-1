import { useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";

export default function Login({ onLogin }) {
  const [savedEmails, setSavedEmails] = useState(() => {
    try {
      const item = localStorage.getItem("savedEmails");
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });
  const [email, setEmail] = useState(
    savedEmails.length > 0 ? savedEmails[0] : "",
  );
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleEmailBlur = () => {
    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Lütfen e-posta giriniz." }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Lütfen geçerli bir e-posta adresi giriniz.",
      }));
    }
  };

  const handlePasswordBlur = () => {
    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Lütfen şifre giriniz." }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { email: "", password: "" };
    let hasError = false;

    if (!email.trim()) {
      newErrors.email = "Lütfen e-posta giriniz.";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Lütfen geçerli bir e-posta adresi giriniz.";
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = "Lütfen şifre giriniz.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      const res = await fetch("http://localhost:9000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Giriş başarılı! Hoşgeldiniz.");

        // Başarılı giriş yapan e-postayı kaydet (en üste ekle, kopyaları temizle)
        const newSaved = [email, ...savedEmails.filter((e) => e !== email)];
        localStorage.setItem("savedEmails", JSON.stringify(newSaved));

        onLogin(data.token, data.name, data.role);
      } else {
        toast.error(data.message || "Giriş başarısız.");
      }
    } catch (err) {
      toast.error("Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 font-sans">
      <Card className="shadow-lg border-0 rounded-xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 w-full py-4 shadow-sm">
          <h2 className="text-3xl font-bold text-center text-white m-0">
            Giriş Yap
          </h2>
        </div>
        <CardBody className="p-4 p-md-5">
          <Form onSubmit={handleSubmit}>
            <FormGroup floating className="mb-4">
              <Input
                id="email"
                name="email"
                placeholder="E-posta adresi"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                onBlur={handleEmailBlur}
                invalid={!!errors.email}
                autoFocus={savedEmails.length === 0}
                list="saved-emails"
              />
              <Label for="email">E-posta adresi</Label>
              {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
              <datalist id="saved-emails">
                {savedEmails.map((em, idx) => (
                  <option key={idx} value={em} />
                ))}
              </datalist>
            </FormGroup>
            <FormGroup floating className="mb-4">
              <Input
                id="password"
                name="password"
                placeholder="Şifre"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                onBlur={handlePasswordBlur}
                invalid={!!errors.password}
                autoFocus={savedEmails.length > 0}
              />
              <Label for="password">Şifre</Label>
              {errors.password && (
                <FormFeedback>{errors.password}</FormFeedback>
              )}
            </FormGroup>
            <Button
              color="primary"
              className="w-100 py-3 fw-bold mt-2"
              size="lg"
              type="submit"
            >
              Giriş Yap
            </Button>
          </Form>
          <p className="text-sm text-gray-500 text-center mt-5 leading-relaxed">
            <span className="font-semibold text-gray-700">Tam Yetki:</span>{" "}
            admin@example.com
            <br />
            <span className="font-semibold text-gray-700">Sadece Okuma: </span>
            user@example.com
            <br />
            <span className="font-semibold text-gray-700">Şifreler:</span>{" "}
            password123
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
