import React, { useState } from "react";
import { Bot } from "grammy";
import { LabeledPrice } from "grammy/types";
import { Button, Card, FlexBoxCol, FlexBoxRow, Input } from "./styled/styled";
import WebApp from "@twa-dev/sdk";

const PaymentStar: React.FC = () => {
  const botToken = import.meta.env.VITE_BOT_TOKEN;
  const bot = new Bot(botToken);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [payload, setPayload] = useState("");
  const [providerToken, setProviderToken] = useState("");
  const [currency, setCurrency] = useState("XTR");
  const [price, setPrice] = useState<number>(1);
  const [invoiceLink, setInvoiceLink] = useState<string | null>(null);
  const [invoiceStatus, setInvoiceStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleCreateInvoice = async () => {
    const prices: LabeledPrice[] = [{ label: title, amount: price }];

    try {
      const link = await bot.api.createInvoiceLink(
        title,
        description,
        payload,
        providerToken,
        currency,
        prices
      );
      setInvoiceLink(link);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const testPayment = async () => {
    if (invoiceLink) {
      WebApp.openInvoice(invoiceLink, (status) => {
        setInvoiceStatus(status);
      });
    }
  };

  return (
    <div className="Container">
      <h3>Handle Invoice</h3>

      <Card>
        <FlexBoxCol>
          <FlexBoxRow>
            <label>Name:</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={32}
            />
          </FlexBoxRow>

          <FlexBoxRow>
            <label>Description:</label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={255}
            />
          </FlexBoxRow>

          <FlexBoxRow>
            <label>Payload:</label>
            <Input
              type="text"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              maxLength={128}
            />
          </FlexBoxRow>

          <FlexBoxRow>
            <label>Token:</label>
            <Input
              type="text"
              value={providerToken}
              onChange={(e) => setProviderToken(e.target.value)}
            />
          </FlexBoxRow>

          <FlexBoxRow>
            <label>Currency:</label>
            <Input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              maxLength={3}
            />
          </FlexBoxRow>

          <FlexBoxRow>
            <label>Price:</label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min={1}
            />
          </FlexBoxRow>

          <Button onClick={handleCreateInvoice}>Create</Button>

          {invoiceLink && (
            <>
              <FlexBoxRow>
                <a href={invoiceLink} target="_blank" rel="noopener noreferrer">
                  {invoiceLink}
                </a>
              </FlexBoxRow>
              <Button onClick={testPayment}>Open</Button>
            </>
          )}

          {invoiceStatus && (
            <FlexBoxRow>
              <b>Status:</b>
              <div>{invoiceStatus}</div>
            </FlexBoxRow>
          )}

          {error && (
            <FlexBoxRow style={{ color: "red" }}>
              <label>Error: </label>
              <div>{error}</div>
            </FlexBoxRow>
          )}
        </FlexBoxCol>
      </Card>
    </div>
  );
};

export default PaymentStar;
