'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from 'next/image'

const columnSets = {
  padrao: "name%2Cdelivery%2Cbudget%2Cspend%2Cresults%2Ccost_per_result%2Creach%2Cimpressions%2Ccpm%2Cfrequency%2Cactions%3Alink_click%2Ccost_per_action_type%3Alink_click%2Cwebsite_ctr%3Alink_click%2Cunique_actions%3Alink_click%2Cunique_link_clicks_ctr",
  ecommerce: "name%2Cdelivery%2Cbudget%2Cspend%2Cresults%2Ccost_per_result%2Creach%2Cimpressions%2Ccpm%2Cfrequency%2Cactions%3Apurchase%2Ccost_per_action_type%3Apurchase%2Cwebsite_purchases_conversion_value%2Cpurchase_roas",
  videoEngagement: "name%2Cdelivery%2Cbudget%2Cspend%2Cresults%2Ccost_per_result%2Creach%2Cimpressions%2Ccpm%2Cfrequency%2Cvideo_p25_watched_actions%2Cvideo_p50_watched_actions%2Cvideo_p75_watched_actions%2Cvideo_p100_watched_actions%2Ccost_per_15_sec_video_view",
  pageEngagement: "name%2Cdelivery%2Cbudget%2Cspend%2Cresults%2Ccost_per_result%2Creach%2Cimpressions%2Ccpm%2Cfrequency%2Cactions%3Apage_engagement%2Ccost_per_action_type%3Apage_engagement%2Cactions%3Alike%2Ccost_per_action_type%3Alike",
  reachFrequency: "name%2Cdelivery%2Cbudget%2Cspend%2Creach%2Cfrequency%2Cimpressions%2Ccpm%2Cactions%3Apost_engagement%2Ccost_per_action_type%3Apost_engagement"
}

export function ColumnGenerator() {
  const [adAccountId, setAdAccountId] = useState('')
  const [businessId, setBusinessId] = useState('')
  const [selectedSet, setSelectedSet] = useState<string>('')
  const [generatedUrl, setGeneratedUrl] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const baseUrl = "https://adsmanager.facebook.com/adsmanager/manage/campaigns?act={{ID CONTA DE ANÚNCIO}}&business_id={{BUSINESS ID}}&nav_entry_point=ads_ecosystem_navigation_menu&columns={{COLUMNS}}&attribution_windows=default&breakdown_regrouping=true&nav_source=ads_manager"

  const generateUrl = (adId: string, busId: string, columns: string) => {
    return baseUrl
      .replace('{{ID CONTA DE ANÚNCIO}}', adId)
      .replace('{{BUSINESS ID}}', busId)
      .replace('{{COLUMNS}}', columns)
  }

  const handleLinkClick = (setName: string) => {
    setSelectedSet(setName)
    if (adAccountId && businessId) {
      const url = generateUrl(adAccountId, businessId, columnSets[setName as keyof typeof columnSets])
      setGeneratedUrl(url)
    } else {
      alert("Por favor, preencha o ID da Conta de Anúncio e o ID do Negócio antes de gerar o URL.")
    }
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000) // Reset após 2 segundos
    } catch (err) {
      console.error('Falha ao copiar texto: ', err)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-center mb-6">
        <Image
          src="/growthad-logo.png"
          alt="Growthad Logo"
          width={350}
          height={100}
          priority
          className="dark:invert"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gerador de Colunas para Meta Ads</CardTitle>
          <CardDescription>Personalize as colunas para análise no gerenciador de anúncios do Meta Ads.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="adAccountId">ID da Conta de Anúncio</Label>
              <Input
                type="text"
                id="adAccountId"
                value={adAccountId}
                onChange={(e) => setAdAccountId(e.target.value)}
                placeholder="Digite o ID da Conta de Anúncio"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="businessId">ID do Negócio</Label>
              <Input
                type="text"
                id="businessId"
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
                placeholder="Digite o ID do Negócio"
                className="mt-1"
              />
            </div>
            <div className="space-y-2">
              <Label>Selecione um conjunto de colunas:</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => handleLinkClick('padrao')}>Padrão Resultados</Button>
                <Button onClick={() => handleLinkClick('ecommerce')}>Visão Ecommerce</Button>
                <Button onClick={() => handleLinkClick('videoEngagement')}>Engajamento com Vídeo</Button>
                <Button onClick={() => handleLinkClick('pageEngagement')}>Engajamento com a Página</Button>
                <Button onClick={() => handleLinkClick('reachFrequency')}>Alcance e Frequência</Button>
              </div>
            </div>
            {generatedUrl && (
              <div>
                <h3 className="text-lg font-semibold mb-2">URL Gerada:</h3>
                <div className="bg-gray-100 p-2 rounded-md break-all">
                  {generatedUrl}
                </div>
                <Button
                  onClick={handleCopyUrl}
                  className="mt-2"
                  variant={copySuccess ? "outline" : "default"}
                >
                  {copySuccess ? "URL Copiada!" : "Copiar URL"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}